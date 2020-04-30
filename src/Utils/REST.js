import fetch from 'node-fetch';
import { pack } from './Utils.js';

class REST {
  constructor(client) {
    this.client = client;

    this.get('/users/@me').then((res) => {
      if (res.status === 401) throw new Error('Invalid token provided.');
    });
  }
  /**
     * @param {String} endpoint
     * @return {Promise<Response>} endpoint
     */
  get(endpoint) {
    return fetch('https://discordapp.com/api/v6' + endpoint, {
      headers: {
        Authorization: 'Bot ' + this.client.private.token,
      },
      agent: false,
    });
  }

  /**
    * @param {String} endpoint
    * @return {Promise<Response>} endpoint
    */
  delete(endpoint) {
    return fetch('https://discordapp.com/api/v6' + endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bot ' + this.client.private.token,
      },
      agent: false,
    });
  }

  /**
     * @param {String} endpoint
     * @param {*} object
     * @return {Promise<Response>}
     */
  post(endpoint, o) {
    return fetch('https://discordapp.com/api/v6' + endpoint, {
      method: 'post',
      body: pack(o),
      headers: {
        'Content-Length': pack(o).length,
        'Content-Type': 'application/json',
        'Authorization': 'Bot ' + this.client.private.token,
      },
      agent: false,
    });
  }

  /**
     * @param {String} endpoint
     * @param {*} object
     * @return {Promise<Response>}
     */
  put(endpoint, o) {
    return fetch('https://discordapp.com/api/v6' + endpoint, {
      method: 'PUT',
      body: pack(o),
      headers: {
        'Content-Length': pack(o).length,
        'Content-Type': 'application/json',
        'Authorization': 'Bot ' + this.client.private.token,
      },
      agent: false,
    });
  }

  /**
     * @param {String} endpoint
     * @param {RequestOptions} options
     * @param {Object} body
     */
  custom(endpoint, options, body) {
    const fetchOptions = options;
    fetchOptions.body = pack(body);
    fetchOptions.agent = false;
    Object.assign(fetchOptions.headers, {Authorization: 'Bot ' + this.client.private.token});
    return fetch('https://discordapp.com/api/v6' + endpoint, fetchOptions);
  }


  /**
     * @param {string} instance
     * @param {Snowflake} id
     * @return {Promise<any|Error>}
     */
  async fetch(instance, id) {
    switch (instance) {
      case 'channel':
        // eslint-disable-next-line no-case-declarations
        this.get(`/channels/${id}`).then(r => r.json().then(res => {
            return new Promise((resolve, reject) => {
              if (r.status !== 200) {
                reject(new Error(res.messsage));
              } else {
                resolve(res);
              }
            });
          }))
    }
  }
}

export default REST;
