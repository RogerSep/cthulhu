import TextSection, { init, initializer } from './model/TextSection';

export default function driveInitialize() {
  window.gapi.load('auth:client,drive-realtime', () => {
    init();
    window.gapi.drive.realtime.custom.registerType(TextSection, 'TextSection');
    window.gapi.drive.realtime.custom.setInitializer(TextSection, initializer);
  });
}
