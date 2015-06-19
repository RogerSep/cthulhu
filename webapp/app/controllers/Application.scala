package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ Environment, LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.authenticators.SessionAuthenticator
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry

import org.cthulhu.oauth2.user.User

import play.api.mvc.Action

import scala.concurrent.Future

import com.mohiva.play.silhouette.impl.providers.OAuth2Info

import play.api.libs.json._
import play.api.libs.functional.syntax._
import scala.collection.mutable.Map

class Application @Inject() (
  socialProviderRegistry: SocialProviderRegistry,
  protected val env: Environment[User, SessionAuthenticator])
  extends Silhouette[User, SessionAuthenticator] {

  implicit val autthInfoFormat = Json.format[OAuth2Info]
  implicit def format = new Writes[scala.collection.mutable.Map[String, OAuth2Info]] {
    def writes(map: Map[String, OAuth2Info]): JsValue = {
      JsObject(
        map.map { case (field, value) => 
          field -> Json.toJson(value)
        } toSeq
      )
    }
  }


  def index = SecuredAction { request =>
    Ok(request.identity.toString())
  }

  def debug = Action {
    Ok(play.api.libs.json.Json.toJson(org.cthulhu.oauth2.OAuth2InfoDAO.data))
  }

}