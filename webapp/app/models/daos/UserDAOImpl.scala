package models.daos

import javax.inject.Inject

import com.mohiva.play.silhouette.api.LoginInfo
import com.sksamuel.elastic4s.ElasticClient
import com.sksamuel.elastic4s.ElasticDsl._
import models.User

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.language.postfixOps

/**
 * Give access to the user object.
 */
class UserDAOImpl @Inject() (implicit elastic: ElasticClient) extends UserDAO {

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

  private def find(loginInfo: LoginInfo)(implicit elastic: ElasticClient): Future[Option[User]] = {
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

  private def save(user: User)(implicit elastic: ElasticClient): Future[User] = {
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
