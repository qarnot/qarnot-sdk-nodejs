const axios = require('axios').default;
const https = require('https');
const urljoin = require('url-join');

class RestClient {
  constructor(config) {
    if (!config) {
      throw new Error('Empty config');
    }
    this.config = Object.assign({}, config); // Prevent shared config usage
  }

  get(path) {
    return this.executeHttp('GET', path);
  }

  post(path, data) {
    return this.executeHttp('POST', path, data);
  }

  put(path, data) {
    return this.executeHttp('PUT', path, data);
  }

  delete(path) {
    return this.executeHttp('DELETE', path);
  }

  executeHttp(method, path, data, headers) {
    const options = {
      method,
      url: urljoin(this.config.clusterUrl, path),
      httpsAgent: new https.Agent({
        rejectUnauthorized: !this.config.clusterUnsafe,
      }),
      headers: {
        authorization: this.config.auth,
        ...headers
      },
      data: data,
    };

    return axios.request(options).then(
      response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(response);
        }
      },
      error => {
        // Handle error as node js error if response field is undefined
        if (!error.response) {
          return Promise.reject({
            message: error.message,
            code: error.code,
          });
        }
        return Promise.reject({
          status: error.response.status,
          statusText: error.response.statusText,
          response: error.response.data.message,
          ...error.response.data
        });
      }
    );
  }
}

module.exports = RestClient;
