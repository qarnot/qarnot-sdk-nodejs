const Resource = require('./Resource');

/** @namespace jobs */
class Job extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/jobs';
    this.operations = ['list', 'get', 'create', 'delete', 'terminate'];
  }

  /** List jobs<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-List_Jobs}
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
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-Job_Information}
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


  /** List tasks in the specified job<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-List_job_s_Tasks}
   * @function
   * @name get
   * @memberof jobs
   * @param uuid {String} uuid of the job
   * @example <caption>Usage</caption>
   * const tasks = await Qarnot.jobs.getTasks('52c10b2d-0687-41e1-985e-7279f6dd543a');
   * console.log(tasks);
   * @example <caption>Output</caption>
   * [
   *   {
   *     "name": "my blend",
   *     "profile": "blender",
   *     "instanceCount": 4,
   *     "snapshotWhitelist": "white.*",
   *     "snapshotBlacklist": "black.*",
   *     "resourceBuckets": [
   *       "my-input-bucket"
   *     ],
   *     "resultBucket": "my-output-bucket",
   *     "state": "Success",
   *     "status": {
   *       "downloadProgress": 100.0,
   *       "executionProgress": 0.0,
   *       "uploadProgress": 0.0,
   *       "instanceCount": 6,
   *       "downloadTime": "00:00:00",
   *       "downloadTimeSec": 0.0,
   *       "environmentTime": "00:00:00",
   *       "environmentTimeSec": 0.0,
   *       "executionTime": "00:00:00",
   *       "executionTimeSec": 0,
   *       "uploadTime": "00:00:00",
   *       "uploadTimeSec" : 0.0,
   *       "succeededRange": "",
   *       "executedRange": "",
   *       "failedRange": "",
   *       "runningInstancesInfo": {
   *         "perRunningInstanceInfo": [
   *           {
   *             "phase": "environment",
   *             "instanceId": 2467,
   *             "maxFrequencyGHz": 0.0,
   *             "currentFrequencyGHz": 0.0,
   *             "cpuUsage": 0.0,
   *             "MaxMemoryMB": 0,
   *             "CurrentMemoryMB": 0,
   *             "networkInKbps": 0.0,
   *             "networkOutKbps": 0.0,
   *             "progress": 0.0,
   *             "executionTimeSec": 0,
   *             "executionTimeGHz": 0.0,
   *             "cpuModel": "",
   *             "activeForwards": [],
   *             "memoryUsage": 0.0
   *           }
   *         ],
   *         "timestamp": "0001-01-01T00:00:00",
   *         "averageFrequencyGHz": 0.0,
   *         "maxFrequencyGHz": 0.0,
   *         "minFrequencyGHz": 0.0,
   *         "averageMaxFrequencyGHz": 0.0,
   *         "averageCpuUsage": 0.0,
   *         "clusterPowerIndicator": 1.0,
   *         "averageMemoryOccupation": 0.0,
   *         "averageNetworkInKbps": 0.0,
   *         "averageNetworkOutKbps": 0.0,
   *         "totalNetworkInKbps": 0.0,
   *         "totalNetworkOutKbps": 0.0
   *       }
   *     },
   *     "snapshotInterval": 0,
   *     "resultsCount":1,
   *     "constants": [
   *       {
   *         "key": "BLEND_FILE",
   *         "value": "final2.blend"
   *       }
   *     ],
   *     "creationDate": "2014-12-24T15:10:54.8659210Z",
   *     "uuid": "52c10b2d-0687-41e1-985e-7279f6dd543a"
   *   }
   * ]
   * @returns {Promise<Object>}
   */
  getTasks(uuid) {
    return this.httpClient.executeHttp('GET', `${this.baseURL}/${uuid}/tasks`, null);
  }

  /** Create a new job<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-Create_job}
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
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-Delete_Job}
   * @function
   * @name delete
   * @memberof jobs
   * @example <caption>Usage</caption>
   * await Qarnot.jobs.delete('bb43b1cb-c03f-4417-9210-a265de8995e9');
   * @returns {Promise}
   */

  /** Terminate a job<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-Terminate_Job}
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

  /** Get a paginate number of user's jobs list<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Jobs-Paginate_Jobs_List}
   * @function
   * @name paginate
   * @memberof jobs
   * @example <caption>Usage</caption>
   * const pagination = await Qarnot.jobs.paginate();
   * console.log(pagination);
   * @example <caption>Output</caption>
   * [
   *    {
   *       data:
   *       [
   *           {
   *             "Connection": null,
   *             "Uuid": "8c97b929-cb3b-4b5e-b630-2a94a1c6b77a",
   *             "Name": "job_0",
   *             "Shortname": "shortname",
   *             "PoolUuid": "00000000-0000-0000-0000-000000000000",
   *             "State": "Completed",
   *             "PreviousState": "Terminating",
   *             "StateTransitionTime": "2020-07-07T16:17:49Z",
   *             "PreviousStateTransitionTime": "2020-07-07T16:17:49Z",
   *             "CreationDate": "2020-07-07T16:15:05Z",
   *             "LastModified": "2020-07-07T16:17:49Z",
   *             "UseDependencies": false,
   *             "MaximumWallTime": "00:00:00",
   *             "Pool": null
   *           }
   *       ],
   *       count: 1,
   *       isTruncated: true,
   *       nextToken: '5ed67ba6d1f1b90d3aff497b'
   *    }
   * ]
   * @returns {Promise<Object[]>}
   */
  paginate(maximumResults = 20, nextToken = null, filter = null, orderBy = null, orderType = null) {
    const pageBody = {
      Token: nextToken,
      Filter: filter,
      MaximumResults: maximumResults,
      OrderBy: orderBy,
      OrderType: orderType
    };
    return this.httpClient.executeHttp('POST', `${this.baseURL}/paginate`, pageBody);
  }
}

module.exports = Job;
