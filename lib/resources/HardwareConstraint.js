const Resource = require('./Resource');

/** @namespace hardwareConstraints */
class HardwareConstraint extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/hardware-constraints';
    this.operations = ['list']; // this attribute is used in Resource class to expose what methods are available
  }

  /** Hardware constraints available for the current user
   * see: {@link https://qarnot.com/documentation/api/#api-Hardware-Constraints}
   * @memberof hardwareConstraints
   * @name list
   * @function
   * @example <caption>Usage</caption>
   * const hardwareConstraints = await Qarnot.hardwareConstraints.list();
   * console.log(hardwareConstraints);
   * @example <caption>Output</caption>
   *{
   *   "data":[
   *    {
   *        "discriminator": "MinimumCoreHardwareConstraint",
   *        "coreCount": 16
   *    },
   *    {
   *        "discriminator": "MaximumCoreHardwareConstraint",
   *        "coreCount": 32
   *    },
   *    {
   *        "discriminator": "MinimumRamCoreRatioHardwareConstraint",
   *        "minimumMemoryGBCoreRatio": 0.4
   *    },
   *    {
   *        "discriminator": "MaximumRamCoreRatioHardwareConstraint",
   *        "maximumMemoryGBCoreRatio": 0.7
   *    },
   *    {
   *        "discriminator": "SpecificHardwareConstraint",
   *        "specificationKey": "R7-2700X"
   *    },
   *    {
   *        "discriminator": "MinimumRamHardwareConstraint",
   *        "minimumMemoryMB": 4000
   *    },
   *    {
   *        "discriminator": "MaximumRamHardwareConstraint",
   *        "maximumMemoryMB": 32000
   *    },
   *    {
   *        "discriminator": "GpuHardwareConstraint"
   *    }],
   *    "offset": 0,
   *    "limit": 50,
   *    "total": 8
   *}
   * @returns {Promise<Object>}
   */
  list({ offset = 0, limit = 50 } = {}) {
    const params = new URLSearchParams({ offset, limit });
    return this.httpClient.get(this.baseURL.concat('?', params.toString()));
  }
}

module.exports = HardwareConstraint;
