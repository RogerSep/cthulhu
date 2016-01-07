package utils

import javax.inject.Inject

import com.mohiva.play.silhouette.api.SecuredErrorHandler
import controllers.routes
import play.api.http.DefaultHttpErrorHandler
import play.api.i18n.Messages
import play.api.libs.json.Json
import play.api.mvc.Results._
import play.api.mvc._
import play.api.routing.Router
import play.api.{UsefulException, Configuration, OptionalSourceMapper}

import scala.concurrent.Future

/**
 * A secured error handler.
 */
class ErrorHandler @Inject() (
  env: play.api.Environment,
  config: Configuration,
  sourceMapper: OptionalSourceMapper,
  router: javax.inject.Provider[Router])
  extends DefaultHttpErrorHandler(env, config, sourceMapper, router)
  with SecuredErrorHandler with Rendering with AcceptExtractors {

  private def loginRequired(request: RequestHeader, messages: Messages): Option[Future[Result]] = {
    val result = render({
      case Accepts.Json() => Forbidden(Json.toJson(Messages("access.denied")(messages)))
      case Accepts.Html() => Redirect(routes.ApplicationController.signIn()).flashing("error" -> Messages("access.denied")(messages))
    })(request)

    Some(Future.successful(result))
  }

  /**
   * Called when a user is not authenticated.
   *
   * As defined by RFC 2616, the status code of the response should be 401 Unauthorized.
   *
   * @param request The request header.
   * @param messages The messages for the current language.
   * @return The result to send to the client.
   */
  override def onNotAuthenticated(request: RequestHeader, messages: Messages): Option[Future[Result]] = loginRequired(request, messages)

  /**
   * Called when a user is authenticated but not authorized.
   *
   * As defined by RFC 2616, the status code of the response should be 403 Forbidden.
   *
   * @param request The request header.
   * @param messages The messages for the current language.
   * @return The result to send to the client.
   */
  override def onNotAuthorized(request: RequestHeader, messages: Messages): Option[Future[Result]] = loginRequired(request, messages)
}
