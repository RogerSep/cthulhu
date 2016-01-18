import Realtime from './Realtime';
import Rx from 'rx';

const gapi = window.gapi;

function documentBindings(documentId) {
  return Rx.Observable.create(subscriber => {
    let document = null;

    const documentReady = doc => {
      document = doc;

      window.drive = {
        document,
        model: document.getModel(),
        root: document.getModel().getRoot()
      };

      subscriber.onNext(doc);

      doc.getModel().getRoot().addEventListener(window.gapi.drive.realtime.EventType.OBJECT_CHANGED, e => {
        subscriber.onNext(doc, e);
      });
    };

    Realtime.authorize(() => {
      gapi.drive.realtime.load(
        documentId,
        documentReady,
        model => {
          const root = model.getRoot();

          const sections = model.createList();
          root.set('sections', sections);
        },
        error => {
          subscriber.onError(error);
        }
      );
    });

    return () => {
      if (document) {
        document.close();
      }
    };
  });
}

export default documentBindings;
