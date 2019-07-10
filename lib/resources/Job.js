const Resource = require('./Resource');

/** @namespace jobs */
class Job extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/jobs';
    this.operations = ['list', 'get', 'create', 'delete', 'terminate'];
  }

  /** List jobs<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Jobs-List_Jobs}
   * @function
   * @name list
   * @memberof jobs
   * @example <caption>Usage</caption>
   * const jobs = await Qarnot.jobs.list();
   * console.log(jobs);
   * @example <caption>Output</caption>
   * [
   *   {
   *    "name": "my job",
   *    "creationDate": "2014-12-24T15:10:54.8659210Z",
   *    "lastModified": "2014-12-24T15:10:54.8659210Z",
   *    "uuid": "52c10b2d-0687-41e1-985e-7279f6dd543a",
   *    "state": 'Active',
   *    "poolUuid": "6307bccd-a886-4b6d-8223-66c9024dd94c",
   *    "useDependencies": true,
   *    "maxWallTime": "1.03:16:50.5000000"
   *   }
   * ]
   * @returns {Promise<Object[]>}
   */

  /** Get information of the specified job<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Jobs-Job_Information}
   * @function
   * @name get
   * @memberof jobs
   * @param uuid {String} uuid of the job
   * @example <caption>Usage</caption>
   * const job = await Qarnot.jobs.get('52c10b2d-0687-41e1-985e-7279f6dd543a');
   * console.log(job);
   * @example <caption>Output</caption>
   * {
   *    "name": "my job",
   *    "creationDate": "2014-12-24T15:10:54.8659210Z",
   *    "lastModified": "2014-12-24T15:10:54.8659210Z",
   *    "uuid": "52c10b2d-0687-41e1-985e-7279f6dd543a",
   *    "state": 'Active',
   *    "poolUuid": "6307bccd-a886-4b6d-8223-66c9024dd94c",
   *    "useDependencies": true,
   *    "maxWallTime": "1.03:16:50.5000000"
   * }
   * @returns {Promise<Object>}
   */

  /** Create a new job<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Jobs-Create_job}
   * @function
   * @name create
   * @memberof jobs
   * @example <caption>Usage</caption>
   * const job = await Qarnot.jobs.create({
   *    "name": "my job",
   *    "poolUuid": "6307bccd-a886-4b6d-8223-66c9024dd94c",
   *    "useDependencies": true,
   *    "maxWallTime": "1.03:16:50.5000000"
   *  });
   * console.log(job)
   * @example <caption>Output</caption>
   * { uuid: 'bb43b1cb-c03f-4417-9210-a265de8995e9' }
   * @returns {Promise<Object>}
   */

  /** Delete a job<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Jobs-Delete_Job}
   * @function
   * @name delete
   * @memberof jobs
   * @example <caption>Usage</caption>
   * await Qarnot.jobs.delete('bb43b1cb-c03f-4417-9210-a265de8995e9');
   * @returns {Promise}
   */

  /** Terminate a job<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Jobs-Terminate_Job}
   * @function
   * @name terminate
   * @memberof jobs
   * @example <caption>Usage</caption>
   * await Qarnot.jobs.terminate('bb43b1cb-c03f-4417-9210-a265de8995e9');
   * @returns {Promise}
   */
  terminate(uuid) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/terminate`, null);
  }
}

module.exports = Job;
