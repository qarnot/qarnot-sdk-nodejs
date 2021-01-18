const Resource = require('./Resource');

/** @namespace pools */
class Pool extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/pools';
    this.operations = ['list', 'get', 'create', 'delete', 'update', 'update_resources'];
  }

  /** List pools<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-List_Pools}
   * @function
   * @name list
   * @memberof pools
   * @example <caption>Usage</caption>
   * const pools = await Qarnot.pools.list();
   * console.log(pools);
   * @example <caption>Output</caption>
   * [
   *   {
   *      "name": "my-pool",
   *      "shortname": "62e80aae-d20a-4608-b873-ec8bff991733",
   *      "creationDate": "2017-11-24T08:52:58Z",
   *      "constants": [
   *        {
   *          "key": "BLEND_FILE",
   *          "value": "qarnot.blend"
   *        }
   *      ],
   *      "tags": [],
   *      "uuid": "62e80aae-d20a-4608-b873-ec8bff991733",
   *      "instanceCount": 2,
   *      "profile": "blender",
   *      "resourceBuckets": [],
   *      "status": {
   *      "downloadProgress": 100.0,
   *      "executionProgress": 0.0,
   *      "uploadProgress": 0.0,
   *      "instanceCount": 2,
   *      "downloadTime": "00:00:00",
   *      "downloadTimeSec": 0.0,
   *      "environmentTime": "00:00:00",
   *      "environmentTimeSec": 0.0,
   *      "executionTime": "00:37:20",
   *      "executionTimeSec": 2240.0,
   *      "uploadTime": "00:00:00",
   *      "uploadTimeSec": 0.0,
   *      "wallTime": "00:19:05",
   *      "wallTimeSec": 1145.0,
   *      "succeededRange": "",
   *      "executedRange": "",
   *      "failedRange": "",
   *      "startedOnceRange": "0-1",
   *      "runningInstancesInfo": {
   *          "perRunningInstanceInfo": [
   *             {
   *                "phase": "execution",
   *                "instanceId": 0,
   *                "maxFrequencyGHz": 4.0,
   *                "currentFrequencyGHz": 3900.0,
   *                "cpuUsage": 0.0,
   *                "maxMemoryMB": 16384,
   *                "currentMemoryMB": 0,
   *                "networkInKbps": 0.0,
   *                "networkOutKbps": 0.0,
   *                "progress": 0.0,
   *                "executionTimeSec": 1132.7,
   *                "executionTimeGHz": 4368.437,
   *                "cpuModel": "",
   *                "activeForwards": [],
   *                "memoryUsage": 0.0
   *             },
   *             {
   *                "phase": "execution",
   *                "instanceId": 1,
   *                "maxFrequencyGHz": 4.0,
   *                "currentFrequencyGHz": 3900.0,
   *                "cpuUsage": 0.0,
   *                "maxMemoryMB": 16384,
   *                "currentMemoryMB": 0,
   *                "networkInKbps": 0.0,
   *                "networkOutKbps": 0.0,
   *                "progress": 0.0,
   *                "executionTimeSec": 1132.7,
   *                "executionTimeGHz": 4368.439,
   *                "cpuModel": "",
   *                "activeForwards": [],
   *                "memoryUsage": 0.0
   *             }
   *          ],
   *          "timestamp": "0001-01-01T00:00:00",
   *          "averageFrequencyGHz": 3900.0,
   *          "maxFrequencyGHz": 3900.0,
   *          "minFrequencyGHz": 3900.0,
   *          "averageMaxFrequencyGHz": 4.0,
   *          "averageCpuUsage": 0.0,
   *          "clusterPowerIndicator": 975.0,
   *          "averageMemoryUsage": 0.0,
   *          "averageNetworkInKbps": 0.0,
   *          "averageNetworkOutKbps": 0.0,
   *          "totalNetworkInKbps": 0.0,
   *          "totalNetworkOutKbps": 0.0,
   *       }
   *     },
   *     "state": "FullyExecuting"
   *   }
   * ]
   * @returns {Promise<Object[]>}
   */

  /** Get information of the specified pool<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-Pool_Information}
   * @function
   * @name get
   * @memberof pools
   * @param uuid {String} uuid of the pool
   * @example <caption>Usage</caption>
   * const pool = await Qarnot.pools.get('62e80aae-d20a-4608-b873-ec8bff991733');
   * console.log(pool);
   * @example <caption>Output</caption>
   * {
   *    "name": "my-pool",
   *    "shortname": "62e80aae-d20a-4608-b873-ec8bff991733",
   *    "creationDate": "2017-11-24T08:52:58Z",
   *    "constants": [
   *      {
   *        "key": "BLEND_FILE",
   *        "value": "qarnot.blend"
   *      }
   *    ],
   *    "tags": [],
   *    "uuid": "62e80aae-d20a-4608-b873-ec8bff991733",
   *    "instanceCount": 2,
   *    "profile": "blender",
   *    "resourceBuckets": [],
   *    "status": {
   *    "downloadProgress": 100.0,
   *    "executionProgress": 0.0,
   *    "uploadProgress": 0.0,
   *    "instanceCount": 2,
   *    "downloadTime": "00:00:00",
   *    "downloadTimeSec": 0.0,
   *    "environmentTime": "00:00:00",
   *    "environmentTimeSec": 0.0,
   *    "executionTime": "00:37:20",
   *    "executionTimeSec": 2240.0,
   *    "uploadTime": "00:00:00",
   *    "uploadTimeSec": 0.0,
   *    "wallTime": "00:19:05",
   *    "wallTimeSec": 1145.0,
   *    "succeededRange": "",
   *    "executedRange": "",
   *    "failedRange": "",
   *    "startedOnceRange": "0-1",
   *    "runningInstancesInfo": {
   *        "perRunningInstanceInfo": [
   *           {
   *              "phase": "execution",
   *              "instanceId": 0,
   *              "maxFrequencyGHz": 4.0,
   *              "currentFrequencyGHz": 3900.0,
   *              "cpuUsage": 0.0,
   *              "maxMemoryMB": 16384,
   *              "currentMemoryMB": 0,
   *              "networkInKbps": 0.0,
   *              "networkOutKbps": 0.0,
   *              "progress": 0.0,
   *              "executionTimeSec": 1132.7,
   *              "executionTimeGHz": 4368.437,
   *              "cpuModel": "",
   *              "activeForwards": [],
   *              "memoryUsage": 0.0
   *           },
   *           {
   *              "phase": "execution",
   *              "instanceId": 1,
   *              "maxFrequencyGHz": 4.0,
   *              "currentFrequencyGHz": 3900.0,
   *              "cpuUsage": 0.0,
   *              "maxMemoryMB": 16384,
   *              "currentMemoryMB": 0,
   *              "networkInKbps": 0.0,
   *              "networkOutKbps": 0.0,
   *              "progress": 0.0,
   *              "executionTimeSec": 1132.7,
   *              "executionTimeGHz": 4368.439,
   *              "cpuModel": "",
   *              "activeForwards": [],
   *              "memoryUsage": 0.0
   *           }
   *        ],
   *        "timestamp": "0001-01-01T00:00:00",
   *        "averageFrequencyGHz": 3900.0,
   *        "maxFrequencyGHz": 3900.0,
   *        "minFrequencyGHz": 3900.0,
   *        "averageMaxFrequencyGHz": 4.0,
   *        "averageCpuUsage": 0.0,
   *        "clusterPowerIndicator": 975.0,
   *        "averageMemoryUsage": 0.0,
   *        "averageNetworkInKbps": 0.0,
   *        "averageNetworkOutKbps": 0.0,
   *        "totalNetworkInKbps": 0.0,
   *        "totalNetworkOutKbps": 0.0,
   *     }
   *   },
   *   "state": "FullyExecuting"
   * }
   * @returns {Promise<Object>}
   */

  /** Create a new pool<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-Create_pool}
   * @function
   * @name create
   * @memberof pools
   * @example <caption>Usage</caption>
   * const pool = await Qarnot.pools.create({
   *   name: 'my blend',
   *   profile: 'blender',
   *   instanceCount: 4,
   *   snapshotWhitelist: 'white.*',
   *   snapshotBlacklist: 'black.*',
   *   resultsWhitelist: 'white.*',
   *   resultsBlacklist: 'black.*',
   *   constants : [
   *     {
   *       key : 'BLEND_FILE',
   *       value :  'final.blend'
   *     }
   *   ],
   *   elasticProperty: {
   *     isElastic: false,
   *     minTotalSlots: 0,
   *     maxTotalSlots: 0,
   *     minIdleSlots: 0,
   *     resizePeriod: 90,
   *     rampResizeFactor: 0.2,
   *     minIdleTimeSeconds: 100
   *   },
   * });
   * console.log(pool)
   * @example <caption>Output</caption>
   * { uuid: 'f7cc95a3-7161-485d-ab2b-b13da6c9c0ea' }
   * @returns {Promise<Object>}
   */

  /** Update a pool<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-Update_pool_s_resources}
   * @function
   * @name update
   * @memberof pools
   * @example <caption>Usage</caption>
   * const pool = await Qarnot.pools.get('f7cc95a3-7161-485d-ab2b-b13da6c9c0ea')
   * pool.elasticProperty.maxTotalSlots = 100;
   * await Qarnot.pools.update('f7cc95a3-7161-485d-ab2b-b13da6c9c0ea', pool);
   * @returns {Promise}
   */

  /** Delete a pool<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-Delete_Pool}
   * @function
   * @name delete
   * @memberof pools
   * @example <caption>Usage</caption>
   * await Qarnot.pools.delete('25b48b2e-b43b-4963-bec3-d7d112e58c81');
   * @returns {Promise}
   */

  /** Update pool's resources <br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-UpdateResource_pool}
   * @function
   * @name updateResources
   * @memberof pools
   * @example <caption>Usage</caption>
   * await Qarnot.pools.updateResources('f7cc95a3-7161-485d-ab2b-b13da6c9c0ea')
   * @returns {undefined}
   */

  /** Close a pool<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-Close_Pool}
   * @function
   * @name close
   * @memberof pools
   * @example <caption>Usage</caption>
   * await Qarnot.pools.close('25b48b2e-b43b-4963-bec3-d7d112e58c81');
   * @returns {Promise}
   */
  close(uuid) {
    return this.httpClient.executeHttp('POST', `${this.baseURL}/${uuid}/close`, null);
  }

  /** List user's pool summaries<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-List_Pool_summaries}
   * @function
   * @name summaries
   * @memberof pools
   * @example <caption>Usage</caption>
   * const summaries = await Qarnot.pools.summaries();
   * console.log(summaries);
   * @example <caption>Output</caption>
   * [
   *    {
   *       "name": "my-pool",
   *       "shortname": "62e80aae-d20a-4608-b873-ec8bff991733",
   *       "creationDate": "2017-11-24T08:52:58Z",
   *       "uuid": "62e80aae-d20a-4608-b873-ec8bff991733",
   *       "instanceCount": 2,
   *       "profile": "blender",
   *       "state": "FullyExecuting"
   *   }
   * ]
   * @returns {Promise<Object[]>}
   */
  summaries() {
    return this.httpClient.executeHttp('GET', `${this.baseURL}/summaries`, null);
  }

  /** Get a paginate number of user's pool list<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-_Paginate_Pool_List}
   * @function
   * @name paginate
   * @memberof pools
   * @example <caption>Usage</caption>
   * const paginate = await Qarnot.pools.paginate();
   * console.log(paginate);
   * @example <caption>Output</caption>
   * [
   *    {
   *       data: [
   *         {
   *           previousState: 'Submitted',
   *           stateTransitionTime: '2020-06-02T16:18:08Z',
   *           previousStateTransitionTime: '2020-06-02T16:17:42Z',
   *           lastModified: '2020-06-02T17:39:06Z',
   *           elasticProperty: [Object],
   *           preparationTask: null,
   *           constants: [],
   *           tags: [],
   *           errors: [],
   *           resourceBuckets: [],
   *           status: null,
   *           uuid: 'c6f24494-6068-460d-bb3c-c75b08f94e4e',
   *           name: 'sample17-pool-docker-init-command',
   *           shortname: 'c6f24494-6068-460d-bb3c-c75b08f94e4e',
   *           profile: 'docker-batch',
   *           state: 'PendingDelete',
   *           instanceCount: 1,
   *           creationDate: '2020-06-02T16:17:41Z',
   *           endDate: '0001-01-01T00:00:00Z',
   *           runningInstanceCount: null,
   *           runningCoreCount: null,
   *           executionTime: null,
   *           wallTime: null
   *         }
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

  /** Get a paginate number of user's pool summaries list<br>
   * see: {@link https://computing.qarnot.com/documentation/api/#api-Pools-Paginate_Pool_Summaries_List}
   * @function
   * @name paginateSummaries
   * @memberof pools
   * @example <caption>Usage</caption>
   * const summaries_paginate = await Qarnot.pools.summaries_paginate();
   * console.log(summaries_paginate);
   * @example <caption>Output</caption>
   * [
   *    {
   *       data: [
   *         {
   *           previousState: 'Submitted',
   *           stateTransitionTime: '2020-06-02T16:18:08Z',
   *           previousStateTransitionTime: '2020-06-02T16:17:42Z',
   *           lastModified: '2020-06-02T17:39:06Z',
   *           elasticProperty: [Object],
   *           preparationTask: null,
   *           constants: [],
   *           tags: [],
   *           errors: [],
   *           resourceBuckets: [],
   *           status: null,
   *           uuid: 'c6f24494-6068-460d-bb3c-c75b08f94e4e',
   *           name: 'sample17-pool-docker-init-command',
   *           shortname: 'c6f24494-6068-460d-bb3c-c75b08f94e4e',
   *           profile: 'docker-batch',
   *           state: 'PendingDelete',
   *           instanceCount: 1,
   *           creationDate: '2020-06-02T16:17:41Z',
   *           endDate: '0001-01-01T00:00:00Z',
   *           runningInstanceCount: null,
   *           runningCoreCount: null,
   *           executionTime: null,
   *           wallTime: null
   *         }
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
      OrderType: orderType
    };
    return this.httpClient.executeHttp('POST', `${this.baseURL}/summaries/paginate`, pageBody);
  }
}

module.exports = Pool;
