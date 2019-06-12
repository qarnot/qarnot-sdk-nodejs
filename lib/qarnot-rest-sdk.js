const restClient = require('./client');
const Profile = require('./resources/Profile');
const Task = require('./resources/Task');
const User = require('./resources/User');
const Pool = require('./resources/Pool');
const Bucket = require('./resources/Buckets');

class QarnotSDK {
  constructor(config) {
    this.config = Object.assign(
      {
        url: 'https://api.qarnot.com',
        storageUrl: 'https://storage.qarnot.com/',
        unsafe: false,
        timeout: 30,
        auth: 'secret_token',
      },
      config
    );

    this.httpClient = new restClient(this.config);

    this.profiles = new Profile(this.httpClient);
    this.tasks = new Task(this.httpClient);
    this.user = new User(this.httpClient);
    this.pools = new Pool(this.httpClient);
    this.buckets = new Bucket(this.user, this.config);
  }
}

module.exports = QarnotSDK;
