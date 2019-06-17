const restClient = require('./client');
const Profile = require('./resources/Profile');
const Task = require('./resources/Task');
const User = require('./resources/User');
const Pool = require('./resources/Pool');
const Bucket = require('./resources/Bucket');

class QarnotSDK {
  constructor(config) {
    this.config = Object.assign(
      {
        clusterUrl: 'https://api.qarnot.com',
        clusterUnsafe: false,
        storageUrl: 'https://storage.qarnot.com/',
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
