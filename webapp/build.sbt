name := """webapp"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

resolvers := ("Atlassian Releases" at "https://maven.atlassian.com/public/") +: resolvers.value

resolvers += Resolver.sonatypeRepo("snapshots")

libraryDependencies ++= Seq(
  cache,
  ws
)

libraryDependencies += "com.sksamuel.elastic4s" %% "elastic4s" % "1.5.6"

libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette" % "2.1-SNAPSHOT",
  "com.mohiva" %% "play-silhouette-testkit" % "2.1-SNAPSHOT" % "test"
)

libraryDependencies += "javax.inject" % "javax.inject" % "1"

libraryDependencies += "net.codingwell" %% "scala-guice" % "4.0.0-beta5"