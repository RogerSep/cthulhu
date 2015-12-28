package controllers

import javax.inject.Inject

import com.google.api.services.drive.model.{File, Permission}
import com.mohiva.play.silhouette.api.{Environment, Silhouette}
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import models.User
import org.cthulhu.service.google.drive.GoogleDriveService
import play.api.i18n.MessagesApi
import play.api.libs.json.Json
import scala.collection.JavaConverters._

/**
  * Created by rogersepulveda on 12/27/15.
  */
class GoogleApiController @Inject() (
  val messagesApi: MessagesApi,
  val env: Environment[User, CookieAuthenticator],
  drive: GoogleDriveService
) extends Silhouette[User, CookieAuthenticator] {

  def createProject(name: String) = SecuredAction { request =>
    val folder = drive.execute { service =>
      val folder = service
        .files()
        .create(new File()
          .setName(name)
          .setMimeType(drive.Types.Files.Folder))
        .setFields("id")
        .execute()

      val permission = new Permission()
        .setEmailAddress(request.identity.email.get)
        .setType(drive.Types.Permission.User)
        .setRole(drive.Types.Permission.Writer)

      service.permissions().create(folder.getId, permission).execute()

      folder
    }

    Ok(Json.toJson(Map("id" -> folder.getId)))
  }

  def list(projectId: Option[String]) = SecuredAction { request =>
    val email = request.identity.email.get

    val files = drive execute { service =>
      val files = service
        .files()
        .list()
        .setQ(s"'$email' in writers or '$email' in readers")
        .execute()

      files.asScala.toList
    }

    Ok(Json.toJson(s"'$email' in writers or '$email' in readers" :: files.map {_.toString()}))
  }

}
