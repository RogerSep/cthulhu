package models.daos

import com.mohiva.play.silhouette.api.LoginInfo
import org.cthulhu.persistence.dao.Elastic.elastic
import com.sksamuel.elastic4s.ElasticDsl._
import com.sksamuel.elastic4s.mappings.FieldType._
import models.User

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.language.postfixOps

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
  def find(loginInfo: LoginInfo) = UserDAOImpl.find(loginInfo)

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User) = UserDAOImpl.save(user)
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
        "google" as (
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
        val user = play.api.libs.json.Json
          .parse(response.getSourceAsString)

        Some(
          User(
            loginInfo,
            (user \ "firstName").asOpt[String],
            (user \ "lastName").asOpt[String],
            (user \ "fullName").asOpt[String],
            (user \ "email").asOpt[String],
            (user \ "avatar").asOpt[String]
          )
        )
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
