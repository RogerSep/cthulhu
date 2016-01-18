import getJSON from '../../app/utils/getJSON';
import { expect } from 'chai';
import { fakeServer } from 'sinon/lib/sinon';

const jsonOptions = { 'Content-Type': 'application/json' };

let server;

describe('getJSON utility', () => {
  beforeEach(() => {
    server = fakeServer.create();
  });

  it('should return a promise that resolves to a json object', () => {
    const req = getJSON('/foo');
    server.requests[0].respond(200, jsonOptions, JSON.stringify({ foo: 'bar' }));
    req.then(json => expect(json).to.be({ foo: 'bar' }));
  });

  afterEach(function() {
    server.restore();
  });
});
