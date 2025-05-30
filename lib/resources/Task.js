const Resource = require('./Resource');

/** @namespace tasks */
class Task extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/tasks';
    this.operations = ['list', 'get', 'delete', 'update_resources', 'clone'];
  }

  /** List all tasks<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-List_Task}
   * @function
   * @name list
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const tasks = await Qarnot.tasks.list();
   * console.log(tasks);
   * @example <caption>Output</caption>
   * [
   *   {
   *     "uuid": "8bc0b16c-6fc3-4ee8-83ef-6c56a7778897",
   *     "name": "helloworld-withdata",
   *     "shortname": "8bc0b16c-6fc3-4ee8-83ef-6c56a7778897",
   *     "profile": "docker-batch",
   *     "poolUuid": null,
   *     "progress": 100,
   *     "runningInstanceCount": 0,
   *     "runningCoreCount": 0,
   *     "executionTime": "00:00:01",
   *     "wallTime": "00:01:55",
   *     "state": "Success",
   *     "instanceCount": 1,
   *     "creationDate": "2019-06-11T12:59:46Z",
   *     "endDate": "2019-06-11T13:01:42Z",
   *     "resourceBuckets": [
   *       "my-input-bucket"
   *     ],
   *     "resultBucket": "my-output-bucket",
   *     "errors": [],
   *     "completedInstances": [],
   *     "status": {
   *       "timestamp": "0001-01-01T00:00:00Z",
   *       "lastUpdateTimestamp": "0001-01-01T00:00:00Z",
   *       "downloadProgress": 0,
   *       "executionProgress": 100,
   *       "uploadProgress": 100,
   *       "instanceCount": 0,
   *       "downloadTime": "00:00:00",
   *       "downloadTimeSec": 0,
   *       "environmentTime": "00:01:45",
   *       "environmentTimeSec": 105,
   *       "executionTime": "00:00:01",
   *       "executionTimeSec": 1,
   *       "executionTimeByCpuModel": [
   *         {
   *           "model": "AMD Ryzen 7 2700X Eight-Core Processor",
   *           "time": 1,
   *           "core": 8
   *         }
   *       ],
   *       "executionTimeGhzByCpuModel": [
   *         {
   *           "model": "AMD Ryzen 7 2700X Eight-Core Processor",
   *           "timeGhz": 0.0001258,
   *           "core": 8,
   *           "clockRatio": 0
   *         }
   *       ],
   *       "uploadTime": "00:00:03",
   *       "uploadTimeSec": 3,
   *       "wallTime": "00:01:55",
   *       "wallTimeSec": 115,
   *       "succeededRange": "0",
   *       "executedRange": "0",
   *       "failedRange": "",
   *       "startedOnceRange": "0",
   *       "runningInstancesInfo": {
   *         "perRunningInstanceInfo": [],
   *         "snapshotResults": [],
   *         "timestamp": "0001-01-01T00:00:00Z",
   *         "averageFrequencyGHz": 0,
   *         "maxFrequencyGHz": 0,
   *         "minFrequencyGHz": 0,
   *         "averageMaxFrequencyGHz": 0,
   *         "averageCpuUsage": 0,
   *         "clusterPowerIndicator": 1,
   *         "averageMemoryUsage": 0,
   *         "averageNetworkInKbps": 0,
   *         "averageNetworkOutKbps": 0,
   *         "totalNetworkInKbps": 0,
   *         "totalNetworkOutKbps": 0,
   *         "runningCoreCountByCpuModel": []
   *       }
   *     },
   *     "snapshotInterval": 0,
   *     "resultsCount": 1,
   *     "constants": [
   *       {
   *         "key": "DOCKER_CMD",
   *         "value": "sh -c \"cat input.txt | rev > output.txt\""
   *       }
   *     ],
   *     "labels": {
   *       "label": "value"
   *     },
   *     "tags": []
   *   }
   * ]
   * @returns {Promise<Object[]>} List of tasks
   */

  /** Get informations of the specified task<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Task_Information}
   * @function
   * @name get
   * @memberof tasks
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.get('8bc0b16c-6fc3-4ee8-83ef-6c56a7778897');
   * console.log(task);
   * @example <caption>Output</caption>
   * {
   *   "uuid": "8bc0b16c-6fc3-4ee8-83ef-6c56a7778897",
   *   "name": "helloworld-withdata",
   *   "shortname": "8bc0b16c-6fc3-4ee8-83ef-6c56a7778897",
   *   "profile": "docker-batch",
   *   "poolUuid": null,
   *   "progress": 100,
   *   "runningInstanceCount": 0,
   *   "runningCoreCount": 0,
   *   "executionTime": "00:00:01",
   *   "wallTime": "00:01:55",
   *   "state": "Success",
   *   "instanceCount": 1,
   *   "creationDate": "2019-06-11T12:59:46Z",
   *   "endDate": "2019-06-11T13:01:42Z",
   *   "resourceBuckets": [
   *     "my-input-bucket"
   *   ],
   *   "resultBucket": "my-output-bucket",
   *   "errors": [],
   *   "completedInstances": [],
   *   "status": {
   *     "timestamp": "0001-01-01T00:00:00Z",
   *     "lastUpdateTimestamp": "0001-01-01T00:00:00Z",
   *     "downloadProgress": 0,
   *     "executionProgress": 100,
   *     "uploadProgress": 100,
   *     "instanceCount": 0,
   *     "downloadTime": "00:00:00",
   *     "downloadTimeSec": 0,
   *     "environmentTime": "00:01:45",
   *     "environmentTimeSec": 105,
   *     "executionTime": "00:00:01",
   *     "executionTimeSec": 1,
   *     "executionTimeByCpuModel": [
   *       {
   *         "model": "AMD Ryzen 7 2700X Eight-Core Processor",
   *         "time": 1,
   *         "core": 8
   *       }
   *     ],
   *     "executionTimeGhzByCpuModel": [
   *       {
   *         "model": "AMD Ryzen 7 2700X Eight-Core Processor",
   *         "timeGhz": 0.0001258,
   *         "core": 8,
   *         "clockRatio": 0
   *       }
   *     ],
   *     "uploadTime": "00:00:03",
   *     "uploadTimeSec": 3,
   *     "wallTime": "00:01:55",
   *     "wallTimeSec": 115,
   *     "succeededRange": "0",
   *     "executedRange": "0",
   *     "failedRange": "",
   *     "startedOnceRange": "0",
   *     "runningInstancesInfo": {
   *       "perRunningInstanceInfo": [],
   *       "snapshotResults": [],
   *       "timestamp": "0001-01-01T00:00:00Z",
   *       "averageFrequencyGHz": 0,
   *       "maxFrequencyGHz": 0,
   *       "minFrequencyGHz": 0,
   *       "averageMaxFrequencyGHz": 0,
   *       "averageCpuUsage": 0,
   *       "clusterPowerIndicator": 1,
   *       "averageMemoryUsage": 0,
   *       "averageNetworkInKbps": 0,
   *       "averageNetworkOutKbps": 0,
   *       "totalNetworkInKbps": 0,
   *       "totalNetworkOutKbps": 0,
   *       "runningCoreCountByCpuModel": []
   *     }
   *   },
   *   "snapshotInterval": 0,
   *   "resultsCount": 1,
   *   "constants": [
   *     {
   *       "key": "DOCKER_CMD",
   *       "value": "sh -c \"cat input.txt | rev > output.txt\""
   *     }
   *   ],
   *   "labels": {
   *     "label": "value"
   *   }
   *   "tags": []
   * }
   * @returns {Promise<Object>}
   */

  /** Delete a task (abort it if it's running)<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Delete_Task}
   * @function
   * @name delete
   * @memberof tasks
   * @example <caption>Usage</caption>
   * await Qarnot.tasks.delete('25b48b2e-b43b-4963-bec3-d7d112e58c81');
   * @returns {Promise}
   */

  /** Create a new task, return its uuid<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-List_Tasks}
   * @function
   * @name submit
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.submit({
   *   name: 'helloworld',
   *   profile: 'docker-batch',
   *   instanceCount: 4,
   *   constants : [
   *     {
   *       key : 'DOCKER_CMD',
   *       value :  'echo hello world from node ${INSTANCE_ID}!'
   *     }
   *   ],
   *   tasks: {
   *     label: "value"
   *   }
   * });
   * console.log(task);
   * @example <caption>Output</caption>
   * {
   *   "uuid": "cddbc5ab-c44d-4c49-9421-0ab795613da7"
   * }
   * @returns {Promise<Object>}
   */
  submit(taskData) {
    return this.httpClient.post(`${this.baseURL}`, taskData);
  }

  /** Create a new task, wait for its completion. stdout&stderr are printed on the fly
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-List_Tasks}
   * @name run
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.run({
   *   name: 'helloworld',
   *   profile: 'docker-batch',
   *   instanceCount: 4,
   *   constants : [
   *     {
   *       key : 'DOCKER_CMD',
   *       value :  'echo hello world from node ${INSTANCE_ID}!'
   *     }
   *   ],
   *  labels: {
   *    label: "value"
   *  }
   * });
   * console.log('task:');
   * console.log(task);
   * @example <caption>Output</caption>
   * 3> hello world from node 3!
   * 2> hello world from node 2!
   * 1> hello world from node 1!
   * 0> hello world from node 0!
   * task:
   * {
   *   "uuid": "00181edb-f156-4a06-a5af-54d503b5a7a0",
   *   "name": "helloworld",
   *   "shortname": "00181edb-f156-4a06-a5af-54d503b5a7a0",
   *   "profile": "docker-batch",
   *   "poolUuid": null,
   *   "progress": 100,
   *   "runningInstanceCount": 0,
   *   "runningCoreCount": 0,
   *   "executionTime": "00:00:04",
   *   "wallTime": "00:02:25",
   *   "state": "Success",
   *   "instanceCount": 4,
   *   "creationDate": "2019-06-11T23:17:13Z",
   *   "endDate": "2019-06-11T23:19:39Z",
   *   "resourceBuckets": [],
   *   "resultBucket": null,
   *   "errors": [],
   *   "completedInstances": [
   *     {
   *       "results": null,
   *       "instanceId": 0,
   *       "wallTimeSec": 144.82016,
   *       "execTimeSec": 1,
   *       "execTimeSecGHz": 0,
   *       "peakMemoryMB": 0,
   *       "state": "Success",
   *       "error": null,
   *       "cpuModel": "AMD Ryzen 7 2700X Eight-Core Processor",
   *       "coreCount": 8,
   *       "clockRatio": 0,
   *       "averageGHz": 0
   *     },
   *     {
   *       "results": null,
   *       "instanceId": 1,
   *       "wallTimeSec": 114.001007,
   *       "execTimeSec": 1,
   *       "execTimeSecGHz": 0,
   *       "peakMemoryMB": 0,
   *       "state": "Success",
   *       "error": null,
   *       "cpuModel": "AMD Ryzen 7 2700X Eight-Core Processor",
   *       "coreCount": 8,
   *       "clockRatio": 0,
   *       "averageGHz": 0
   *     },
   *     {
   *       "results": null,
   *       "instanceId": 2,
   *       "wallTimeSec": 103.250336,
   *       "execTimeSec": 1,
   *       "execTimeSecGHz": 0,
   *       "peakMemoryMB": 0,
   *       "state": "Success",
   *       "error": null,
   *       "cpuModel": "AMD Ryzen 7 2700X Eight-Core Processor",
   *       "coreCount": 8,
   *       "clockRatio": 0,
   *       "averageGHz": 0
   *     },
   *     {
   *       "results": null,
   *       "instanceId": 3,
   *       "wallTimeSec": 98.1486,
   *       "execTimeSec": 1,
   *       "execTimeSecGHz": 3.70000029,
   *       "peakMemoryMB": 0,
   *       "state": "Success",
   *       "error": null,
   *       "cpuModel": "AMD Ryzen 7 2700X Eight-Core Processor",
   *       "coreCount": 8,
   *       "clockRatio": 1,
   *       "averageGHz": 3.70000029
   *     }
   *   ],
   *   "status": {
   *     "timestamp": "0001-01-01T00:00:00Z",
   *     "lastUpdateTimestamp": "0001-01-01T00:00:00Z",
   *     "downloadProgress": 0,
   *     "executionProgress": 100,
   *     "uploadProgress": 100,
   *     "instanceCount": 0,
   *     "downloadTime": "00:00:00",
   *     "downloadTimeSec": 0,
   *     "environmentTime": "00:06:32",
   *     "environmentTimeSec": 392,
   *     "executionTime": "00:00:04",
   *     "executionTimeSec": 4,
   *     "executionTimeByCpuModel": [
   *       {
   *         "model": "AMD Ryzen 7 2700X Eight-Core Processor",
   *         "time": 4,
   *         "core": 8
   *       }
   *     ],
   *     "executionTimeGhzByCpuModel": [
   *       {
   *         "model": "AMD Ryzen 7 2700X Eight-Core Processor",
   *         "timeGhz": 3.70000029,
   *         "core": 8,
   *         "clockRatio": 0.25
   *       }
   *     ],
   *     "uploadTime": "00:00:04",
   *     "uploadTimeSec": 4,
   *     "wallTime": "00:02:25",
   *     "wallTimeSec": 145,
   *     "succeededRange": "0-3",
   *     "executedRange": "0-3",
   *     "failedRange": "",
   *     "startedOnceRange": "0-3",
   *     "runningInstancesInfo": {
   *       "perRunningInstanceInfo": [],
   *       "snapshotResults": [],
   *       "timestamp": "0001-01-01T00:00:00Z",
   *       "averageFrequencyGHz": 0,
   *       "maxFrequencyGHz": 0,
   *       "minFrequencyGHz": 0,
   *       "averageMaxFrequencyGHz": 0,
   *       "averageCpuUsage": 0,
   *       "clusterPowerIndicator": 1,
   *       "averageMemoryUsage": 0,
   *       "averageNetworkInKbps": 0,
   *       "averageNetworkOutKbps": 0,
   *       "totalNetworkInKbps": 0,
   *       "totalNetworkOutKbps": 0,
   *       "runningCoreCountByCpuModel": []
   *     }
   *   },
   *   "snapshotInterval": 0,
   *   "resultsCount": 0,
   *   "constants": [
   *     {
   *       "key": "DOCKER_CMD",
   *       "value": "echo hello world from node ${INSTANCE_ID}!"
   *     }
   *   "labels": {
   *     "label": "value"
   *   }
   *   ],
   *   "tags": []
   * }
   * @returns {Promise<Object>} Task description
   */
  async run(taskData) {
    const { uuid } = await this.submit(taskData);

    let task;
    for (;;) {
      await new Promise(r => setTimeout(r, 10000)); //wait 10s
      const stdout = await this.lastStdout(uuid);
      const stderr = await this.lastStderr(uuid);
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
      task = await this.get(uuid);
      if (['Cancelled', 'Success', 'Failure'].includes(task.state)) break;
    }
    return task;
  }

  /** List a summary of all your tasks<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-List_Tasks_Summaries}
   * @memberof tasks
   * @function
   * @name summaries
   * @example <caption>Usage</caption>
   * await Qarnot.tasks.summaries();
   * @example <caption>Output</caption>
   * [
   *   {
   *     "uuid": "8bc0b16c-6fc3-4ee8-83ef-6c56a7778897",
   *     "name": "helloworld-withdata",
   *     "shortname": "8bc0b16c-6fc3-4ee8-83ef-6c56a7778897",
   *     "profile": "docker-batch",
   *     "poolUuid": null,
   *     "progress": 100,
   *     "runningInstanceCount": 0,
   *     "runningCoreCount": 0,
   *     "executionTime": "00:00:01",
   *     "wallTime": "00:01:55",
   *     "state": "Success",
   *     "instanceCount": 1,
   *     "creationDate": "2019-06-11T12:59:46Z",
   *     "endDate": "2019-06-11T13:01:42Z"
   *   }
   * ]
   * @returns {Promise<Object[]>} Object (see link above)
   */
  summaries() {
    return this.httpClient.executeHttp('GET', `${this.baseURL}/summaries`, null);
  }

  /** Error output of the task (can be rotated) since last access<br><br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Last_Task_Std_Err}
   * @memberof tasks
   * @function
   * @name lastStderr
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * let stderr = await Qarnot.tasks.lastStderr('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * console.log(stderr);
   * console.log('===')
   * //sleep 30
   * stderr = await Qarnot.tasks.lastStderr('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * console.log(stderr);
   * @example <caption>Output</caption>
   * 3> stderr from node 3!
   * ===
   * 2> stderr from node 2!
   * 1> stderr from node 1!
   * 0> stderr from node 0!
   * @returns {Promise<String>}
   */
  lastStderr(uuid) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/stderr`, null);
  }

  /** Standard output of the task (can be rotated) since last access.<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Last_Task_Std_Out}
   * @memberof tasks
   * @function
   * @name lastStdout
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * let stdout = await Qarnot.tasks.lastStdout('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * console.log(stdout);
   * console.log('===')
   * //sleep 30
   * stdout = await Qarnot.tasks.lastStdout('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * console.log(stdout);
   * @example <caption>Output</caption>
   * 3> hello world from node 3!
   * ===
   * 2> hello world from node 2!
   * 1> hello world from node 1!
   * 0> hello world from node 0!
   * @returns {Promise<String>}
   */
  lastStdout(uuid) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/stdout`, null);
  }

  /** Error output of the task (can be rotated).<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Task_Std_Err}
   * @memberof tasks
   * @function
   * @name stderr
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * const stderr = await Qarnot.tasks.stderr('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * console.log(stderr);
   * @example <caption>Output</caption>
   * 3> stderr from node 3!
   * 2> stderr from node 2!
   * 1> stderr from node 1!
   * 0> stderr from node 0!
   * @returns {Promise<String>}
   */
  stderr(uuid) {
    return this.httpClient.executeHttp('GET', `${this.baseURL}/${uuid}/stderr`);
  }

  /** Standard output of the task (can be rotated).<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Task_Std_Out}
   * @memberof tasks
   * @function
   * @name stdout
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * const stdout = await Qarnot.tasks.stdout('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * console.log(stdout);
   * @example <caption>Output</caption>
   * 3> hello world from node 3!
   * 2> hello world from node 2!
   * 1> hello world from node 1!
   * 0> hello world from node 0!
   * @returns {Promise<String>}
   */
  stdout(uuid) {
    return this.httpClient.executeHttp('GET', `${this.baseURL}/${uuid}/stdout`);
  }

  /** Request only one snapshot<br>
   * see: {@link https://qarnot.com/documentation/api/#tag/Tasks/paths/~1v%7Bversion%7D~1tasks~1%7BtaskUuid%7D~1snapshot/post}
   * @memberof tasks
   * @function
   * @name triggerSnapshot
   * @param uuid {String} uuid of the task to snapshot
   * @param snapshotConfig {Object} snapshot parameters
   * @example <caption>Usage</caption>
   * await Qarnot.tasks.triggerSnapshot('00181edb-f156-4a06-a5af-54d503b5a7a0', {
   *   whitelist: '.*white.*',
   *   blacklist: '.*black.*',
   *   bucket: 'customBucket',
   *   bucketPrefix: 'prefix-',
   * });
   * @returns {Promise}
   */
  triggerSnapshot(uuid, snapshotConfig) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/snapshot`, snapshotConfig);
  }

  /** Request periodic snapshot<br>
   * see: {@link https://qarnot.com/documentation/api/#tag/Tasks/paths/~1v%7Bversion%7D~1tasks~1%7BtaskUuid%7D~1snapshot~1periodic/post}
   * @memberof tasks
   * @function
   * @name triggerPeriodicSnapshot
   * @param uuid {String} uuid of the task to snapshot
   * @param snapshotConfig {Object} periodic snapshot parameters
   * @example <caption>Usage</caption>
   * await Qarnot.tasks.triggerPeriodicSnapshot('00181edb-f156-4a06-a5af-54d503b5a7a0', {
   *   interval: 30,
   *   whitelist: '.*white.*',
   *   blacklist: '.*black.*',
   *   bucket: 'customBucket',
   *   bucketPrefix: 'prefix-',
   * });
   * @returns {Promise}
   */
  triggerPeriodicSnapshot(uuid, snapshotConfig) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/snapshot/periodic`, snapshotConfig);
  }

  /** Trigger task's resources update on compute nodes: add new files, update existing files. <br />
   * NOTE: does NOT delete any files from the compute nodes, even if they were removed from resource buckets. <br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-UpdateResources_Task}
   * @memberof tasks
   * @function
   * @name updateResources
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * await Qarnot.task.update_resources('00181edb-f156-4a06-a5af-54d503b5a7a0')
   * @returns {undefined}
   */

  /** Abort a task<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Abort_Task}
   * @memberof tasks
   * @function
   * @name abort
   * @param uuid {String} uuid of the task
   * @example <caption>Usage</caption>
   * await Qarnot.tasks.abort('00181edb-f156-4a06-a5af-54d503b5a7a0');
   * @returns {Promise}
   */
  abort(uuid) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/abort`, null);
  }

  /** Get a paginate number of user's task list<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Paginate_Tasks}
   * @function
   * @name paginate
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const paginate = await Qarnot.tasks.paginate();
   * console.log(paginate);
   * @example <caption>Output</caption>
   * [
   *    {
   *       data:
   *       [
   *           {
   *             "Shortname": "3ed6fb06-354c-492f-9897-4d1020316530",
   *             "Name": "test5",
   *             "Profile": "docker-batch",
   *             "Resources": [],
   *             "ResourcesBuckets": [],
   *             "Results": null,
   *             "ResultsBucket": null,
   *             "State": "Success",
   *             "PreviousState": "UploadingResults",
   *             "StateTransitionTime": "2020-06-12T13:01:50Z",
   *             "PreviousStateTransitionTime": "2020-06-12T13:01:44Z",
   *             "LastModified": "2020-06-12T13:01:50Z",
   *             "Errors": [],
   *             "Status": {
   *               "DownloadProgress": 0.0,
   *               "ExecutionProgress": 100.0,
   *               "UploadProgress": 100.0,
   *               "InstanceCount": 0,
   *               "DownloadTimeSec": 0,
   *               "ExecutionTimeSec": 1,
   *               "UploadTimeSec": 1,
   *               "SucceededRange": "0",
   *               "ExecutedRange": "0",
   *               "FailedRange": "",
   *               "RunningInstancesInfo": {
   *                 "Timestamp": "0001-01-01T00:00:00Z",
   *                 "AverageFrequencyGHz": 0.0,
   *                 "MaxFrequencyGHz": 0.0,
   *                 "MinFrequencyGHz": 0.0,
   *                 "AverageMaxFrequencyGHz": 0.0,
   *                 "AverageCpuUsage": 0.0,
   *                 "ClusterPowerIndicator": 1.0,
   *                 "AverageMemoryUsage": 0.0,
   *                 "AverageNetworkInKbps": 0.0,
   *                 "AverageNetworkOutKbps": 0.0,
   *                 "TotalNetworkInKbps": 0.0,
   *                 "TotalNetworkOutKbps": 0.0,
   *                 "PerRunningInstanceInfo": []
   *               },
   *               "ExecutionTimeByCpuModel": [
   *                 {
   *                   "Model": "AMD Ryzen 7 1700X Eight-Core Processor",
   *                   "Time": 1,
   *                   "Core": 8
   *                 }
   *               ],
   *               "ExecutionTimeGhzByCpuModel": [
   *                 {
   *                   "Model": "AMD Ryzen 7 1700X Eight-Core Processor",
   *                   "TimeGhz": 0.0002609452,
   *                   "Core": 8,
   *                   "ClockRatio": 0.0
   *                 }
   *               ]
   *             },
   *             "CreationDate": "2020-06-12T13:00:09Z",
   *             "ResultsCount": 0,
   *             "Tags": [],
   *             "Constants": {
   *               "DOCKER_REPO": "library/ubuntu",
   *               "DOCKER_TAG": "latest",
   *               "DOCKER_CMD": "ls",
   *             },
   *             "Constraints": {
   *             },
   *             "Labels": {
   *             },
   *             "DependsOn": [],
   *             "SnapshotInterval": 0,
   *             "PoolUuid": "00000000-0000-0000-0000-000000000000",
   *             "Pool": null,
   *             "JobUuid": "00000000-0000-0000-0000-000000000000",
   *             "Job": null,
   *             "Completed": true,
   *             "Executing": false,
   *             "InstanceCount": 1,
   *             "ResultsWhitelist": null,
   *             "ResultsBlacklist": null,
   *             "SnapshotWhitelist": null,
   *             "SnapshotBlacklist": null,
   *             "Instances": [
   *               0
   *             ],
   *             "Connection": null,
   *             "Uuid": "3ed6fb06-354c-492f-9897-4d1020316530"
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
      OrderType: orderType,
    };
    return this.httpClient.executeHttp('POST', `${this.baseURL}/paginate`, pageBody);
  }

  /** Get a paginate number of user's task summaries list<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Paginate-Tasks-Summaries_Task}
   * @function
   * @name paginateSummaries
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const paginate_summaries = await Qarnot.tasks.summaries_pagination();
   * console.log(paginate_summaries);
   * @example <caption>Output</caption>
   * [
   *    {
   *       data:
   *       [
   *           {
   *             "Shortname": "3ed6fb06-354c-492f-9897-4d1020316530",
   *             "Name": "test5",
   *             "Profile": "docker-batch",
   *             "Resources": [],
   *             "ResourcesBuckets": [],
   *             "Results": null,
   *             "ResultsBucket": null,
   *             "State": "Success",
   *             "PreviousState": "UploadingResults",
   *             "StateTransitionTime": "2020-06-12T13:01:50Z",
   *             "PreviousStateTransitionTime": "2020-06-12T13:01:44Z",
   *             "LastModified": "2020-06-12T13:01:50Z",
   *             "Errors": [],
   *             "Status": {
   *               "DownloadProgress": 0.0,
   *               "ExecutionProgress": 100.0,
   *               "UploadProgress": 100.0,
   *               "InstanceCount": 0,
   *               "DownloadTimeSec": 0,
   *               "ExecutionTimeSec": 1,
   *               "UploadTimeSec": 1,
   *               "SucceededRange": "0",
   *               "ExecutedRange": "0",
   *               "FailedRange": "",
   *               "RunningInstancesInfo": {
   *                 "Timestamp": "0001-01-01T00:00:00Z",
   *                 "AverageFrequencyGHz": 0.0,
   *                 "MaxFrequencyGHz": 0.0,
   *                 "MinFrequencyGHz": 0.0,
   *                 "AverageMaxFrequencyGHz": 0.0,
   *                 "AverageCpuUsage": 0.0,
   *                 "ClusterPowerIndicator": 1.0,
   *                 "AverageMemoryUsage": 0.0,
   *                 "AverageNetworkInKbps": 0.0,
   *                 "AverageNetworkOutKbps": 0.0,
   *                 "TotalNetworkInKbps": 0.0,
   *                 "TotalNetworkOutKbps": 0.0,
   *                 "PerRunningInstanceInfo": []
   *               },
   *               "ExecutionTimeByCpuModel": [
   *                 {
   *                   "Model": "AMD Ryzen 7 1700X Eight-Core Processor",
   *                   "Time": 1,
   *                   "Core": 8
   *                 }
   *               ],
   *               "ExecutionTimeGhzByCpuModel": [
   *                 {
   *                   "Model": "AMD Ryzen 7 1700X Eight-Core Processor",
   *                   "TimeGhz": 0.0002609452,
   *                   "Core": 8,
   *                   "ClockRatio": 0.0
   *                 }
   *               ]
   *             },
   *             "CreationDate": "2020-06-12T13:00:09Z",
   *             "ResultsCount": 0,
   *             "Tags": [],
   *             "Constants": {
   *               "DOCKER_REPO": "library/ubuntu",
   *               "DOCKER_TAG": "latest",
   *               "DOCKER_CMD": "ls",
   *             },
   *             "Constraints": {
   *             },
   *             "DependsOn": [],
   *             "SnapshotInterval": 0,
   *             "PoolUuid": "00000000-0000-0000-0000-000000000000",
   *             "Pool": null,
   *             "JobUuid": "00000000-0000-0000-0000-000000000000",
   *             "Job": null,
   *             "Completed": true,
   *             "Executing": false,
   *             "InstanceCount": 1,
   *             "ResultsWhitelist": null,
   *             "ResultsBlacklist": null,
   *             "SnapshotWhitelist": null,
   *             "SnapshotBlacklist": null,
   *             "Instances": [
   *               0
   *             ],
   *             "Connection": null,
   *             "Uuid": "3ed6fb06-354c-492f-9897-4d1020316530"
   *           }
   *       ],
   *       count: 1,
   *       isTruncated: true,
   *       nextToken: '5ed67ba6d1f1b90d3aff497b'
   *    }
   * ]
   * @returns {Promise<Object[]>}
   */
  summaries_paginate(maximumResults = 20, nextToken = null, filter = null, orderBy = null, orderType = null) {
    const pageBody = {
      Token: nextToken,
      Filter: filter,
      MaximumResults: maximumResults,
      OrderBy: orderBy,
      OrderType: orderType,
    };
    return this.httpClient.executeHttp('POST', `${this.baseURL}/summaries/paginate`, pageBody);
  }

  /** Clones a task with the possibility to change the value of some fields
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Clone_task}
   * @name clone
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.clone('3ed6fb06-354c-492f-9897-4d1020316530',
   *   {
   *     "name": "clonedTask"
   *     "tags": [
   *       "t1",
   *       "t2"
   *     ],
   *     "constants" : [
   *       {
   *       "key" : "MY_CONSTANT",
   *       "value" : "my value"
   *       }
   *     ]
   *   }
   * });
   * console.log(task);
   * @example <caption>Output</caption>
   * {
   *   "uuid": "cddbc5ab-c44d-4c49-9421-0ab795613da7"
   * }
   * @returns {Promise<Object>}
   */

  /** Resumes a task's cancelled instances with the possibility to change the value of some fields
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Resume_task}
   * @name resume
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.resume('3ed6fb06-354c-492f-9897-4d1020316530',
   *   {
   *     "name": "resumedTask"
   *     "tags": [
   *       "t1",
   *       "t2"
   *     ],
   *     "constants" : [
   *       {
   *       "key" : "MY_CONSTANT",
   *       "value" : "my value"
   *       }
   *     ]
   *   }
   * });
   * console.log(task);
   * @example <caption>Output</caption>
   * {
   *   "uuid": "cddbc5ab-c44d-4c49-9421-0ab795613da7"
   * }
   * @returns {Promise<Object>}
   */
  resume(uuid, taskData) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/resume`, taskData);
  }

  /** Recovers a task's failed and cancelled instances with the possibility to change the value of some fields
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Recover_task}
   * @name recover
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.recover('3ed6fb06-354c-492f-9897-4d1020316530',
   *   {
   *     "name": "recoveredTask"
   *     "tags": [
   *       "t1",
   *       "t2"
   *     ],
   *     "constants" : [
   *       {
   *       "key" : "MY_CONSTANT",
   *       "value" : "my value"
   *       }
   *     ]
   *   }
   * });
   * console.log(task);
   * @example <caption>Output</caption>
   * {
   *   "uuid": "cddbc5ab-c44d-4c49-9421-0ab795613da7"
   * }
   * @returns {Promise<Object>}
   */
  recover(uuid, taskData) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/recover`, taskData);
  }

  /** Retries a task's failed instances with the possibility to change the value of some fields
   * see: {@link https://qarnot.com/documentation/api/#api-Tasks-Retry_task}
   * @name retry
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const task = await Qarnot.tasks.retry('3ed6fb06-354c-492f-9897-4d1020316530',
   *   {
   *     "name": "retriedTask"
   *     "tags": [
   *       "t1",
   *       "t2"
   *     ],
   *     "constants" : [
   *       {
   *       "key" : "MY_CONSTANT",
   *       "value" : "my value"
   *       }
   *     ]
   *   }
   * });
   * console.log(task);
   * @example <caption>Output</caption>
   * {
   *   "uuid": "cddbc5ab-c44d-4c49-9421-0ab795613da7"
   * }
   * @returns {Promise<Object>}
   */
  retry(uuid, taskData) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/retry`, taskData);
  }

  /**
   * see: {@link https://qarnot.com/documentation/api/#tag/Tasks/paths/~1carbon~1v1~1Tasks~1%7BtaskId%7D~1carbon-facts/get}
   * @name getCarbonFacts
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const carbonFacts = await Qarnot.tasks.getCarbonFacts(
   *   '3ed6fb06-354c-492f-9897-4d1020316530',
   *   { comparisonDatacenter: 'european_dc' },
   * );
   * console.log(carbonFacts);
   * @example <caption>Output</caption>
   * {
   *   "equivalent_datacenter_name": "Common European Datacenter",
   *   "equivalent_DC_carbon_footprint": 84.5,
   *   "saved_carbon_footprint_compute": 66.8,
   *   "saved_carbon_footprint_heat": 17.1,
   *   "saved_carbon_footprint_compute_heat": 83.8,
   *   "saved_carbon_footprint_percent": 17.7,
   *   "total_consumed_energy_Wh": 306.043,
   *   "total_energy_it_Wh": 300.064,
   *   "total_reused_energy_Wh": 294.041,
   *   "qarnot_carbon_footprint": 17.7,
   *   "PUE": 1.001,
   *   "ERE": 0.036,
   *   "ERF": 0.964,
   *   "WUE": 0
   * }
   * @returns {Promise<Object>}
   */
  getCarbonFacts(uuid, params) {
    const queryParams = new URLSearchParams(params);
    const url = `/carbon/v1${this.baseURL}/${uuid}/carbon-facts?${queryParams.toString()}`;
    return this.httpClient.executeHttp('GET', url);
  }

  /** Retrieve task's port forwarding informations
   * @name getPortForwarding
   * @function
   * @memberof tasks
   * @example <caption>Usage</caption>
   * const taskPortForwarding = await Qarnot.tasks.getPortForwarding('3ed6fb06-354c-492f-9897-4d1020316530');
   * console.log(taskPortForwarding);
   * @example <caption>Output</caption>
   * {
   *   "0": {
   *     "vdi": {
   *       "name": "vdi",
   *       "enabled": true,
   *       "applicationType": "vnc",
   *       "proto": "https",
   *       "port": 8000,
   *       "allowedIPs": "0.0.0.0/0",
   *       "access": {
   *         "publicHost": "{taskUuid}-{instance}-{nom}.gateway.qarnotservices.com",
   *         "publicPort": 30
   *       }
   *     }
   *   }
   * }
   * @returns {Promise<Object>}
   */
  getPortForwarding(uuid) {
    return this.httpClient.executeHttp('GET', `/v1/network${this.baseURL}/${uuid}/port-forward`);
  }
}

module.exports = Task;
