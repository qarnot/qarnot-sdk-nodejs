const QarnotSDK = require('../index');
const config = require('./config_test');

const qarnot = new QarnotSDK(config);

describe('HardwareConstraint', function() {
  test('Can list available hardware constraints', async function() {
    const hardwareConstraints = await qarnot.hardwareConstraints.list();
    expect(hardwareConstraints).toMatchObject({});
    expect(hardwareConstraints.data).toEqual(expect.any(Array));
    expect(hardwareConstraints.data.length).toStrictEqual(Math.min(hardwareConstraints.total, hardwareConstraints.limit));

    const limit = 1;
    const limitedHWConstraints = await qarnot.hardwareConstraints.list({ offset: 0, limit: limit });
    expect(limitedHWConstraints).toMatchObject({});
    expect(limitedHWConstraints.limit).toStrictEqual(limit);
    expect(limitedHWConstraints.data.length).toStrictEqual(limit);
  });
});
