import Realtime from './Realtime';
import Rx from 'rx';

function documentBindings(documentId) {
  return Rx.Observable.create((subscriber) => {
    let document = null;

    Realtime.authorize(() => {
      window.gapi.drive.realtime.load(
        documentId,
        doc => {
          document = doc;

          subscriber.onNext(doc);
        },
        doc => {},
        error => subscriber.onError(error)
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
