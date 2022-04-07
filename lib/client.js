const axios = require('axios');
const https = require('https');
const urljoin = require('url-join');
const HttpError = require('./httpError');

class RestClient {
  constructor(config) {
    if (!config) {
      throw new Error('Empty config');
    }

    // Prevent shared config usage
    this.config = Object.assign({
      // default to 1 sec as base for exponential backoff duration between retries: 2^retry * retryIntervalMs
      retryIntervalMs: 1000,
      // default to 5 retries, this will lead to a total of 1 + 5 = 6 tries in worst cases
      retryMaxNumber: 5,
    }, config);

    // retry request on following status codes
    this.transientStatusCodes = [
      429, // Too Many Request
      500, // Internal Server Error
      502, // Bad Gateway
      503, // Service Unavailable
      504, // Gateway Timeout
    ]
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
      timeout: this.config.timeout || 30000, // arbitrary value in ms
      data: data,
      validateStatus: null, // tell axios to resolve for all status code
    };

    return this.retryRequestExponential(options);
  }

  async retryRequestExponential(options,  retryNumber = 0) {
    const response = await axios.request(options);

    if (this.transientStatusCodes.includes(response.status) && retryNumber < this.config.retryMaxNumber) {
      const waitingTimeMs = (2 ** retryNumber) * this.config.retryIntervalMs;
      await RestClient.wait(waitingTimeMs);
      return this.retryRequestExponential(options, retryNumber + 1)
    }

    if (response.status >= 400) {
      throw new HttpError({
        message: response.data?.message,
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
    }
    
    if (response.status >= 300 && response.status < 400) {
      // return whole response for redirections
      return response;
    }

    return response.data;
  }

  static wait(durationMs) {
    return new Promise(resolve => {
      setTimeout(resolve, durationMs);
    });
  }
}

module.exports = RestClient;
