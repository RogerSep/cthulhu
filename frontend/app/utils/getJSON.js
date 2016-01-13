import fetch from 'isomorphic-fetch';

/**
 * Abstracts fetch API to return json instantly.
 * @param {String} url Path of the url to request.
 * @return {Promise} Promise that resolves with the json object.
 */
export default url => fetch(url, { credentials: 'same-origin' }).then(res => res.json());
