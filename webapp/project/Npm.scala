import java.net.InetSocketAddress

import play.sbt.PlayRunHook
import sbt._

object Npm {
  def apply (base: File): PlayRunHook = {

    object NpmProcess extends PlayRunHook {
      var process: Option[Process] = None

      override def beforeStarted(): Unit = {
        Process("npm run watch", base).run
      }

      override def afterStarted(addr: InetSocketAddress): Unit = {
        process = Some(Process("npm run watch", base).run)
      }

      override def afterStopped(): Unit = {
        process.map(p => p.destroy())
        process = None
      }
    }

    NpmProcess
  }
}