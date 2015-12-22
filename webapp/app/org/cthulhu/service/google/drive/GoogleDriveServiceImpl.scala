package org.cthulhu.service.google.drive

import java.util.Collections

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.google.api.services.drive.{Drive, DriveScopes}

/**
  * Created by rogersepulveda on 12/18/15.
  */
class GoogleDriveServiceImpl {

  lazy val credentials = new GoogleCredential.Builder()
    .setTransport(Constants.HttpTransport)
    .setJsonFactory(Constants.JsonFactory)
    .setServiceAccountId("p12-test@focus-fold-94417.iam.gserviceaccount.com")
    .setServiceAccountPrivateKeyFromP12File(new java.io.File("/Users/rogersepulveda/apl/cthulhu/webapp/conf/fun-notes-test.p12"))
    .setServiceAccountScopes(DriveScopes.all())
    .build()

  lazy val drive = new Drive.Builder(Constants.HttpTransport, Constants.JsonFactory, credentials)
    .setApplicationName("fun-notes")
    .build()

  def execute [T](f: Drive => T) = {
    f(drive)
  }

  object Constants {
    val JsonFactory = JacksonFactory.getDefaultInstance
    val HttpTransport = GoogleNetHttpTransport.newTrustedTransport()
  }
}
