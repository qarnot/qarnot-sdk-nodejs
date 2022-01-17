const Resource = require('./Resource');

/** @namespace user */
class User extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/info';
  }

  /** Quotas and disks information about the current user
   * see: {@link https://qarnot.com/documentation/api/#api-User-Info}
   * @memberof user
   * @name get
   * @function
   * @example <caption>Usage</caption>
   * const user = await Qarnot.user.get();
   * console.log(user);
   * @example <caption>Output</caption>
   * {
   *   email: 'cool.user@qarnot-computing.com',
   *   maxDisk: 0,
   *   diskCount: 0,
   *   maxBucket: 100,
   *   maxTask: 100,
   *   taskCount: 6,
   *   maxPool: 50,
   *   poolCount: 0,
   *   maxRunningTask: 10,
   *   maxRunningPool: 50,
   *   runningTaskCount: 0,
   *   runningPoolCount: 0,
   *   maxInstances: 64,
   *   quotaBytes: 0,
   *   quotaBytesBucket: 10737412742,
   *   usedQuotaBytesBucket: 12288,
   *   usedQuotaBytes: 0,
   *   quotaBytesDisk: 0,
   *   usedQuotaBytesDisk: 0
   * }
   * @returns {Promise<Object>}
   */
  get() {
    return this.httpClient.executeHttp('GET', `${this.baseURL}`, null);
  }
}

module.exports = User;
