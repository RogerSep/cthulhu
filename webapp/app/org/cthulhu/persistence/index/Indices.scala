package org.cthulhu.persistence.index

import javax.inject.Inject
import com.sksamuel.elastic4s.ElasticClient
import com.sksamuel.elastic4s.ElasticDsl._
import com.sksamuel.elastic4s.mappings.FieldType._
import com.sksamuel.elastic4s.ElasticDsl.{create, index}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.language.postfixOps

/**
 * Created by rogersepulveda on 10/29/15.
 */
class Indices @Inject() (elastic: ElasticClient) {

  def run() {
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
  }

}
