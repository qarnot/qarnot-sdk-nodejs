class Resource {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.baseURL = '';
    this.operations = [];
  }

  isMethodAvailable(name) {
    return this.operations.indexOf(name) !== -1;
  }

  get(uuid) {
    if (!this.isMethodAvailable('get')) throw new Error('Method not allowed');

    return this.httpClient.executeHttp('GET', `${this.baseURL}/${uuid}`, null);
  }

  create(data) {
    if (!this.isMethodAvailable('create')) throw new Error('Method not allowed');

    return this.httpClient.executeHttp('POST', this.baseURL, data);
  }

  list() {
    if (!this.isMethodAvailable('list')) throw new Error('Method not allowed');

    return this.httpClient.executeHttp('GET', this.baseURL, null);
  }

  delete(uuid) {
    if (!this.isMethodAvailable('delete')) throw new Error('Method not allowed');

    return this.httpClient.executeHttp('DELETE', `${this.baseURL}/${uuid}`, null);
  }

  update(uuid, data) {
    if (!this.isMethodAvailable('update')) throw new Error('Method not allowed');

    return this.httpClient.executeHttp('PUT', `${this.baseURL}/${uuid}`, data);
  }

  update_resources(uuid) {
    if (!this.isMethodAvailable('update_resources')) throw new Error('Method not allowed');

    return this.httpClient.executeHttp('PATCH', `${this.baseURL}/${uuid}`, null);
  }
}

module.exports = Resource;
