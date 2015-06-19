package org.cthulhu.oauth2.user

import com.mohiva.play.silhouette.api.LoginInfo
import com.sksamuel.elastic4s.ElasticClient.{local => elastic}
  import com.sksamuel.elastic4s.ElasticDsl._
  import com.sksamuel.elastic4s.mappings.FieldType._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
 * Give access to the user object.
 */
class UserDAOImpl extends UserDAO {

  /**
   * Finds a user by its login info.
   *
   * @param loginInfo The login info of the user to find.
   * @return The found user or None if no user for the given login info could be found.
   */
  def find(loginInfo: LoginInfo): Future[Option[User]] = UserDAOImpl.find(loginInfo)
  
  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User] = UserDAOImpl.save(user)
}

/**
 * The companion object.
 */
object UserDAOImpl {

  elastic execute {
    index exists "users"
  } filter { response =>
    !response.isExists
  } flatMap { response =>
    elastic execute {
      create index "users" mappings (
        "google" as(
          "id" typed StringType,
          "firstName" typed StringType,
          "lastName" typed StringType,
          "fullName" typed StringType,
          "email" typed StringType,
          "avatar" typed StringType
          )
        )
    }
  } recover {
    case _ => Unit
  } await

  private def find(loginInfo: LoginInfo): Future[Option[User]] = {
    elastic execute {
      get id loginInfo.providerKey from ("users/" + loginInfo.providerID)
    } map { response =>
      if (response.isExists) {
        play.api.libs.json.Json
          .parse(response.getSourceAsString)
          .asOpt(User.userFmt)
      } else {
        None
      }
    }
  }


  private def save(user: User): Future[User] = {
    elastic execute {
      index into ("users" / user.loginInfo.providerID) fields (
        "id" -> user.loginInfo.providerKey,
        "firstName" -> user.firstName.getOrElse(""),
        "lastName" -> user.lastName.getOrElse(""),
        "fullName" -> user.fullName.getOrElse(""),
        "email" -> user.email.getOrElse(""),
        "avatar" -> user.avatarURL.getOrElse("")
      ) id user.loginInfo.providerKey
    } map { _ =>
      user
    }
  }
}
