package controllers

import java.util.Collections
import javax.inject.Inject

import com.google.api.client.http.FileContent
import com.google.api.services.drive.Drive
import com.google.api.services.drive.model.{File, Permission}
import com.mohiva.play.silhouette.api.{Environment, Silhouette}
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import models.User
import org.cthulhu.service.google.drive.GoogleDriveService
import play.api.i18n.MessagesApi
import play.api.libs.json.Json
import scala.collection.JavaConverters._
import scala.collection.JavaConversions._

/**
  * Created by rogersepulveda on 12/27/15.
  */
class GoogleApiController @Inject() (
  val messagesApi: MessagesApi,
  val env: Environment[User, CookieAuthenticator],
  drive: GoogleDriveService
) extends Silhouette[User, CookieAuthenticator] {

  def getProjectFolder(project: String)(implicit service: Drive): File = {
    service
      .files
      .list()
      .setQ(s"appProperties has { key='mainDocument' and value='$project' }")
      .execute()
      .getFiles
      .head
  }

  def createProject(name: String) = SecuredAction { request =>
    val project = drive.execute { service =>
      val project = service
        .files()
        .create(new File()
          .setName(name)
          .setAppProperties(
            Map("type" -> "mainDocument")
          ))
        .setFields("id, name")
        .execute()

      val projectFolder = service
        .files
        .create(new File()
          .setName(name)
          .setMimeType(drive.Types.Files.Folder)
          .setAppProperties(
            Map("mainDocument" -> project.getId)
          ))
        .execute()

      service.files.update(project.getId, null)
        .setAddParents(projectFolder.getId)
        .execute()

      val permission = new Permission()
        .setEmailAddress(request.identity.email.get)
        .setType(drive.Types.Permission.User)
        .setRole(drive.Types.Permission.Writer)

      service.permissions().create(projectFolder.getId, permission).execute()

      project
    }

    Ok(Json.parse(project.toString))
  }

  def deleteProject(id: String) = SecuredAction { request =>
    val result = drive.execute { implicit service =>
      val projectFolder = getProjectFolder(id)

      service.files().delete(projectFolder.getId).execute()
    }

    Ok("deleted")
  }

  def list(projectId: Option[String]) = SecuredAction { request =>
    val email = request.identity.email.get
    val query = s"('$email' in writers or '$email' in readers) and appProperties has { key='type' and value='mainDocument' }" +
      projectId.map(id => s" and '$id' in parents").getOrElse("")

    val files = drive execute { service =>
      val files = service
        .files()
        .list()
        .setQ(query)
        .execute()

      files.getFiles.asScala.toList
    }

    Ok(Json.toJson(files.map(file => Json.parse(file.toString))))
  }

  def shareProject(project: String, email: String) = SecuredAction { request =>

    drive.execute { implicit service =>
      val permission = new Permission()
        .setEmailAddress(email)
        .setType(drive.Types.Permission.User)
        .setRole(drive.Types.Permission.Writer)

      service.permissions().create(getProjectFolder(project).getId, permission).execute()
    }

    Ok("shared")
  }

  def upload(project: String) = SecuredAction(parse.multipartFormData) { request =>
    request.body.file("file").map { imageFile =>
      drive.execute { implicit service =>
        val projectFolder = getProjectFolder(project)

        val fileMetadata = new File()
          .setName(imageFile.filename)
          .setParents(Collections.singletonList(projectFolder.getId))

        val fileContent = new FileContent(imageFile.contentType.getOrElse("octet/stream"), imageFile.ref.file)
        val file = service.files.create(fileMetadata, fileContent).setFields("id, imageMediaMetadata, name, webContentLink").execute()

        Ok(Json.parse(file.toString))
      }
    } getOrElse {
      BadRequest(Json.obj("error" -> "No file in the \"file\" parameter under the form"))
    }
  }

}
