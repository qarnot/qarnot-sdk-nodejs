const QarnotSDK = require('../index');
const config = require('./config_test');

const qarnot = new QarnotSDK(config);

let createdPoolUuid, clonedPoolUuid;

describe('Pools', function() {
  test('Can create a pool', async function() {
    const pool = await qarnot.pools.create({
      schedulingType: 'flex',
      instanceCount: 1,
      constants: [
        {
          key: 'USER_POOL_PREPARATION_CMD',
          value: '/bin/true',
        },
        {
          key: 'RUN_USER_POOL_PREPARATION_CMD',
          value: 'false',
        },
        {
          key: 'DOCKER_START_CONTAINER_IN_ENVIRONMENT',
          value: 'false',
        },
        {
          key: 'DOCKER_SRV',
          value: 'https://registry-1.docker.io',
        },
        {
          key: 'DOCKER_REPO',
          value: 'library/ubuntu',
        },
        {
          key: 'DOCKER_TAG',
          value: 'latest',
        },
        {
          key: 'DOCKER_SHUTDOWN_CMD',
          value: '/bin/true',
        },
        {
          key: 'RESOURCES_PATH',
          value: '/job',
        },
        {
          key: 'DOCKER_WORKDIR',
          value: '${DOCKER_WORKDIR}',
        },
      ],
      profile: 'docker-batch',
      name: 'helloworld',
      shortname: 'helloworld',
    });
    createdPoolUuid = pool.uuid;
    expect(pool).toMatchObject({});
    expect(pool.uuid).toEqual(expect.any(String));
    expect(pool.uuid.length).toStrictEqual(36);
  });

  test("Can fetch pool's carbon facts", async function() {
    const carbonFacts = await qarnot.pools.getCarbonFacts(createdPoolUuid);
    expect(carbonFacts).toMatchObject({});
  });

  test('Can list all pools', async function() {
    const pools = await qarnot.pools.list();
    expect(pools).toEqual(expect.any(Array));
    expect(pools.find(t => t.uuid === createdPoolUuid)).toBeDefined();
  });

  test('Can get a pool', async function() {
    const pool = await qarnot.pools.get(createdPoolUuid);
    expect(pool).toMatchObject({});
    expect(pool.uuid).toStrictEqual(createdPoolUuid);
  });

  test('Can update a pool', async function() {
    await qarnot.pools.update(createdPoolUuid, {
      tags: ['updated'],
    });
    const pool = await qarnot.pools.get(createdPoolUuid);
    expect(JSON.stringify(pool.tags)).toStrictEqual(JSON.stringify(['updated']));
  });

  test('Can check the sanity of scaling policies for a pool', async function() {
    const data = {
      policies: [
        {
          type: 'ManagedTasksQueue',
          minTotalSlots: 0,
          maxTotalSlots: 10,
          minIdleSlots: 1,
          minIdleTimeSeconds: 90,
          scalingFactor: 0.5,
          name: 'the-active-policy',
          enabledPeriods: [
            {
              type: 'Weekly',
              days: ['thursday'],
              startTimeUtc: '19:30:00',
              endTimeUtc: '23:59:59',
              name: 'thursday-evening',
            },
            {
              type: 'Weekly',
              days: ['friday'],
              startTimeUtc: '00:00:00',
              endTimeUtc: '10:00:00',
              name: 'friday-morning',
            },
          ],
        },
        {
          type: 'Fixed',
          slotsCount: 19,
          name: 'default-policy',
          enabledPeriods: [
            {
              type: 'Always',
              name: 'always',
            },
          ],
        },
      ],
    };
    const response = await qarnot.pools.check_scaling_policies_sanity(data);
    expect(JSON.stringify(response)).toStrictEqual(JSON.stringify(''));
  });

  test('Can send error when checking the sanity of scaling policies for a pool', async function() {
    const data = {
      policies: [
        {
          slotsCount: 12,
          type: 'Wrong policy type name',
          name: 'test_fixed_policies',
          enabledPeriods: [
            {
              type: 'Wrong period type name',
              name: 'default_always',
            },
          ],
        },
      ],
    };
    let errorResponse;
    await qarnot.pools.check_scaling_policies_sanity(data).catch(err => (errorResponse = err));
    expect(errorResponse.status).toStrictEqual(400);
    expect(errorResponse.statusText).toStrictEqual('Bad Request');
    expect(JSON.stringify(errorResponse.data.errors)).toStrictEqual(JSON.stringify({ 'policies[0]': ['The input was not valid.'] }));
  });

  test('Can update a scaling policies of a pool', async function() {
    const data = {
      policies: [
        {
          type: 'ManagedTasksQueue',
          minTotalSlots: 0,
          maxTotalSlots: 10,
          minIdleSlots: 1,
          minIdleTimeSeconds: 90,
          scalingFactor: 0.5,
          name: 'the-active-policy',
          enabledPeriods: [
            {
              type: 'Weekly',
              days: ['thursday'],
              startTimeUtc: '19:30:00',
              endTimeUtc: '23:59:59',
              name: 'thursday-evening',
            },
            {
              type: 'Weekly',
              days: ['friday'],
              startTimeUtc: '00:00:00',
              endTimeUtc: '10:00:00',
              name: 'friday-morning',
            },
          ],
        },
        {
          type: 'Fixed',
          slotsCount: 19,
          name: 'default-policy',
          enabledPeriods: [
            {
              type: 'Always',
              name: 'always',
            },
          ],
        },
      ],
    };
    await qarnot.pools.update_scaling_policies(createdPoolUuid, data);
    const pool = await qarnot.pools.get(createdPoolUuid);
    expect(JSON.stringify(pool.scaling.policies)).toStrictEqual(JSON.stringify(data.policies));
  });

  test('Can clone a pool', async function() {
    const clonedPoolID = await qarnot.pools.clone(createdPoolUuid, {
      name: 'clonedPool',
    });
    const clonedPool = await qarnot.pools.get(clonedPoolID.uuid);
    clonedPoolUuid = clonedPoolID.uuid;
    const pool = await qarnot.pools.get(createdPoolUuid);
    const keysToExclude = [
      'creationDate',
      'lastModified',
      'stateTransitionTime',
      'previousStateTransitionTime',
      'uuid',
      'name',
      'shortname',
      'status',
      'state',
      'previousState',
      'runningInstanceCount',
      'executionTime',
      'wallTime',
    ];
    const newClonedPool = { ...clonedPool };
    const newPool = { ...pool };
    keysToExclude.forEach(key => {
      delete newClonedPool[key];
      delete newPool[key];
    });
    expect(JSON.stringify(newClonedPool)).toStrictEqual(JSON.stringify(newPool));
  });

  test('Can list all pools summary', async function() {
    const pools = await qarnot.pools.summaries();
    expect(pools).toEqual(expect.any(Array));
    expect(pools.find(t => t.uuid === createdPoolUuid)).toBeDefined();
    expect(pools.find(t => t.uuid === clonedPoolUuid)).toBeDefined();
  });

  test('Can list all pools with pagination', async function() {
    const response = await qarnot.pools.paginate(1);
    expect(response.data).toEqual(expect.any(Array));
    expect(response.count).toStrictEqual(1);
    expect(response.isTruncated).toStrictEqual(true);
  });

  test('Can list all pools summary with pagination', async function() {
    const response = await qarnot.pools.summaries_paginate(1);
    expect(response.data).toEqual(expect.any(Array));
    expect(response.count).toStrictEqual(1);
    expect(response.isTruncated).toStrictEqual(true);
  });

  test('Can close of a pool', async function() {
    await qarnot.pools.close(createdPoolUuid);
    const pool = await qarnot.pools.get(createdPoolUuid);
    expect(pool.state).toStrictEqual('Closing');
  });

  test('Can delete a pool', async function() {
    await qarnot.pools.delete(createdPoolUuid);
    await qarnot.pools.delete(clonedPoolUuid);
    const pools = await qarnot.pools.list();
    expect(pools).toEqual(expect.any(Array));
    const deletedPool = pools.find(t => t.uuid === createdPoolUuid);
    if (deletedPool) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedPool.state).toStrictEqual('PendingDelete');
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedPool).toBeUndefined();
    }
  });
});
