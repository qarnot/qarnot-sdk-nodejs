class HttpError extends Error {
  constructor({ message = 'unknown error', status, statusText, data = null } = {}) {
    super(message);

    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

module.exports = HttpError;
