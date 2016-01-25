# Cthulhu - Projects Documentation Tool

## Configuration

### Front-end

Open the terminal and run:

```
cd frontend && npm i
```

You will need a recent version of `npm` and `node` because we are using ES6.

### Back-end

Use a recent version of the JDK, 8 preferably.

Install the activator from [play framework](https://www.playframework.com/download). In OSX, you can run `brew install typesafe-activator`

You will need a configuration file for running the application in the local environment under `webapp/conf/application.local.conf` with the following configurations entries (note the `/path/to/project` part)

```
com.cthulhu.drive.p12file="{**/path/to/project**}/webapp/conf/fun-notes.p12"
```

#### Run the application

```
cd webapp
activator run
```

This will fire the server in the port `9000` and the webpack-dev-server in the port `3000`. Make sure these ports are free. Go to `http://localhost:9000`

## Known issues

- Sometimes an error pops in the console with the message `Drive Realtime API Error: token_refresh_required: The OAuth token must be refreshed.` It seems to be a bug in google. Until a solution comes in and this error is happening to you, please close your google session and log in again.
- While developing, the data structure of the collaborative documents might change; please delete the projects and create new ones if that's the case.

## TODO

- [ ] Create a new component for annotated images with file upload
- [ ] Webpack for production
- [ ] Organize folder structure
- [ ] Automated tests

## License

MIT
