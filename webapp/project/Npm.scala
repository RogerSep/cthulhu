import java.net.InetSocketAddress

import play.sbt.PlayRunHook
import sbt._

object Npm {
  def apply (base: File): PlayRunHook = {

    object NpmProcess extends PlayRunHook {
      var process: Option[Process] = None
      val frontEndDirectory = new File(base.getAbsolutePath + "/../frontend")

      override def beforeStarted(): Unit = {

      }

      override def afterStarted(addr: InetSocketAddress): Unit = {
        process = Some(Process("npm start", frontEndDirectory).run)
      }

      override def afterStopped(): Unit = {
        process.map(p => p.destroy())
        process = None
      }
    }

    NpmProcess
  }
}