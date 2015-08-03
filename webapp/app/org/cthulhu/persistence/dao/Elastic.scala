package org.cthulhu.persistence.dao

/**
 * Created by rogersepulveda on 7/31/15.
 */
trait Elastic {

  val elastic = com.sksamuel.elastic4s.ElasticClient.local

}
