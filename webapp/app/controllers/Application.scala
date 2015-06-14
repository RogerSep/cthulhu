package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ Environment, LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry

import org.cthulhu.oauth2.user.User

import scala.concurrent.Future

class Application @Inject() (
  socialProviderRegistry: SocialProviderRegistry,
  protected val env: Environment[User, SessionAuthenticator])
  extends Silhouette[User, SessionAuthenticator] {

  def index = SecuredAction { request =>
    Ok(request.identity.toString())
  }

}