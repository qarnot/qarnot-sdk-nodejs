const QarnotSDK = require('../index');
const assert = require('chai').assert;
const config = require('./config_test');

const Qarnot = new QarnotSDK({
  auth: config.token,
});

describe('HardwareConstraint', function() {
  it('Can list available hardware constraints', async function() {
    const hardwareConstraints = await Qarnot.hardwareConstraints.list();
    assert.isObject(hardwareConstraints);
    assert.isArray(hardwareConstraints.data)
    assert.lengthOf(hardwareConstraints.data, Math.min(hardwareConstraints.total, hardwareConstraints.limit));

    const limit = 1;
    const limitedHWConstraints = await Qarnot.hardwareConstraints.list({offset:0,limit:limit});
    assert.isObject(limitedHWConstraints);
    assert.equal(limitedHWConstraints.limit, limit)
    assert.lengthOf(limitedHWConstraints.data, limit);
  });
});
