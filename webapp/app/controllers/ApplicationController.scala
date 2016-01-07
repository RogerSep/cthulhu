package controllers

import javax.inject.Inject

import com.google.api.services.drive.Drive
import com.google.api.services.drive.model.{Permission, File}
import com.mohiva.play.silhouette.api.{Environment, LogoutEvent, Silhouette}
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import models.User
import models.daos.OAuth2InfoDAO
import org.cthulhu.service.google.drive.GoogleDriveServiceImpl
import play.api.i18n.MessagesApi
import play.api.mvc.Action
import play.api.routing.JavaScriptReverseRouter

import scala.concurrent.Future
import scala.collection.JavaConverters._

/**
 * The basic application controller.
 *
 * @param messagesApi The Play messages API.
 * @param env The Silhouette environment.
 * @param socialProviderRegistry The social provider registry.
 */
class ApplicationController @Inject() (
  val messagesApi: MessagesApi,
  val env: Environment[User, CookieAuthenticator],
  socialProviderRegistry: SocialProviderRegistry)
  extends Silhouette[User, CookieAuthenticator] {

  /**
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = SecuredAction.async { implicit request =>
    Future.successful(Ok(views.html.index()))
  }

  def indexPath(path: String) = index()

  /**
   * Handles the Sign In action.
   *
   * @return The result to display.
   */
  def signIn = UserAwareAction.async { implicit request =>
    request.identity match {
      case Some(user) => Future.successful(Redirect(routes.ApplicationController.index()))
      case None => Future.successful(Ok(views.html.signIn(socialProviderRegistry)))
    }
  }

  /**
   * Handles the Sign Out action.
   *
   * @return The result to display.
   */
  def signOut = SecuredAction.async { implicit request =>
    val result = Redirect(routes.ApplicationController.index())
    env.eventBus.publish(LogoutEvent(request.identity, request, request2Messages))

    env.authenticatorService.discard(request.authenticator, result)
  }

  def debug = Action { request =>
    Ok(OAuth2InfoDAO.data.toString)
  }

  def test = Action { request =>
    val service = new GoogleDriveServiceImpl

    val works = service.execute({ drive: Drive =>
      val files = drive.files().list().setPageSize(10).execute().getFiles.asScala

      val permissions = drive.permissions().list(files.head.getId).execute().getPermissions.asScala

      val permission = new Permission().setEmailAddress("roger.planetgreen@gmail.com").setRole("writer").setType("user")
      val p = drive.permissions().create(files.head.getId, permission).execute()

      val f = files.map { file =>
        file.toPrettyString
      }.toList

      val yee = permissions.map { permission =>
        permission.toPrettyString
      }.toList

      f :: yee :: List(p.toPrettyString)
    })

    Ok(works.toString)
  }

  def create(name: String) = Action { request =>
    val service = new GoogleDriveServiceImpl

    Ok(service.execute { drive =>

      val roger = new Permission().setEmailAddress("rsepulveda@hugeinc.com").setRole("writer").setType("user")
      val rsepulveda = new Permission().setEmailAddress("rsepulveda@hugeinc.com").setRole("writer").setType("user")

      val file = new File()
        .setName(name)
        //.setPermissions(List(roger, rsepulveda))

      val execution = drive.files().create(file).execute

      execution.toPrettyString
    })
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.GoogleApiController.createProject,
        routes.javascript.GoogleApiController.list
      )
    ).as("text/javascript")
  }

}
