package modules

import com.google.inject.AbstractModule
import com.sksamuel.elastic4s.ElasticClient
import net.codingwell.scalaguice.ScalaModule
import org.cthulhu.service.google.drive.{GoogleDriveServiceImpl, GoogleDriveService}
import play.api.libs.concurrent.AkkaGuiceSupport

/**
 * Created by rogersepulveda on 10/29/15.
 */
class CthulhuModule extends AbstractModule with AkkaGuiceSupport with ScalaModule {

  def configure = {
    bind[ElasticClient].toInstance(ElasticClient.local)
    bind[GoogleDriveService].toInstance(new GoogleDriveServiceImpl)
  }
  
}
