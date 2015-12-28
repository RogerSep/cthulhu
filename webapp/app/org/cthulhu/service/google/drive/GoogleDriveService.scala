package org.cthulhu.service.google.drive

import com.google.api.services.drive.Drive

/**
  * Created by rogersepulveda on 12/18/15.
  */
trait GoogleDriveService {

  def execute [T](f: Drive => T): T

  object Types {
    object Files {
      val Folder = "application/vnd.google-apps.folder"
    }

    object Permission {
      val User = "user"
      val Writer = "writer"
    }
  }



}
