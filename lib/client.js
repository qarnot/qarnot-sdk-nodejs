const requestPromise = require('request-promise');
const request = require('request');
const fs = require('fs');

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

  executeHttp(method, path, data) {
    const options = {
      method,
      url: this.config.url + path,
      rejectUnauthorized: !this.config.unsafe,
      headers: {
        authorization: this.config.auth,
      },
      json: true,
      body: data,
    };

    return requestPromise(options);
  }

  uploadHttp(remotePath, localPath, remoteName) {
    const formData = {
      file: {
        value: fs.createReadStream(localPath),
        options: {
          filename: remoteName,
          contentType: 'text/plain',
        },
      },
    };

    const options = {
      url: this.config.url + remotePath,
      headers: {
        'Content-Type': 'application/json',
        authorization: this.config.auth,
      },
      rejectUnauthorized: !this.config.unsafe,
      method: 'POST',
      formData: formData,
    };

    return requestPromise(options);
  }

  downloadHttp(path, onData, onComplete) {
    const options = {
      method: 'GET',
      url: this.config.url + path,
      rejectUnauthorized: !this.config.unsafe,
      headers: {
        'Content-Type': 'application/json',
        authorization: this.config.auth,
      },
    };

    let downloadFailed = false;
    const req = request(options, (err, response, body) => {
      if (!err && (response.statusCode < 200 || response.statusCode >= 300)) {
        err = {};
        if (body && body.hasOwnProperty('message')) err = { statusCode: response.statusCode, message: body.message };
        else err = { statusCode: response.statusCode, message: body || 'Unknown error' };
        return err;
      }
      onComplete(err);
    });
    req.on('response', response => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        downloadFailed = true;
      }
    });
    req.on('data', data => {
      if (downloadFailed) return;
      onData(data);
    });
  }
}

module.exports = RestClient;
