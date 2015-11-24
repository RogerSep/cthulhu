
import org.cthulhu.persistence.index.Indices
import play.api.GlobalSettings
import play.api.Application

/**
 * Created by rogersepulveda on 10/29/15.
 */
object Global extends GlobalSettings {

  override def onStart(app: Application) {

    app.injector.instanceOf(classOf[Indices]).run()

  }

}
