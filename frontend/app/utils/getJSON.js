import fetch from 'isomorphic-fetch';

export default url => fetch(url, { credentials: 'same-origin' })
  .then(response => response.json());
