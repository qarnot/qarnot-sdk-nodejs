const QarnotSDK = require('../index');
const assert = require('chai').assert;
const config = require('./config_test');

const Qarnot = new QarnotSDK({
  auth: config.token,
});

let createdPoolUuid, clonedPoolUuid;

describe('Pools', function() {
  it('Can create a pool', async function() {
    const pool = await Qarnot.pools.create({
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
    assert.isObject(pool);
    assert.isString(pool.uuid);
    assert.lengthOf(pool.uuid, 36);
  });

  it('Can list all pools', async function() {
    const pools = await Qarnot.pools.list();
    assert.isArray(pools);
    assert.exists(pools.find(t => t.uuid === createdPoolUuid));
  });

  it('Can get a pool', async function() {
    const pool = await Qarnot.pools.get(createdPoolUuid);
    assert.isObject(pool);
    assert.strictEqual(pool.uuid, createdPoolUuid);
  });

  it('Can update a pool', async function() {
    await Qarnot.pools.update(createdPoolUuid, {
      tags: ['updated'],
    });
    const pool = await Qarnot.pools.get(createdPoolUuid);
    assert.strictEqual(JSON.stringify(pool.tags), JSON.stringify(['updated']));
  });

  it('Can update a scaling policies of a pool', async function() {
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
    await Qarnot.pools.update_scaling_policies(createdPoolUuid, data);
    const pool = await Qarnot.pools.get(createdPoolUuid);
    assert.strictEqual(JSON.stringify(pool.scaling.policies), JSON.stringify(data.policies));
  });

  it('Can clone a pool', async function() {
    const clonedPoolID = await Qarnot.pools.clone(createdPoolUuid, {
      name: 'clonedPool',
    });
    const clonedPool = await Qarnot.pools.get(clonedPoolID.uuid);
    clonedPoolUuid = clonedPoolID.uuid;
    const pool = await Qarnot.pools.get(createdPoolUuid);
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
    assert.strictEqual(JSON.stringify(newClonedPool), JSON.stringify(newPool));
  });

  it('Can list all pools summary', async function() {
    const pools = await Qarnot.pools.summaries();
    assert.isArray(pools);
    assert.exists(pools.find(t => t.uuid === createdPoolUuid));
    assert.exists(pools.find(t => t.uuid === clonedPoolUuid));
  });

  it('Can list all pools with pagination', async function() {
    const response = await Qarnot.pools.paginate(1);
    assert.isArray(response.data);
    assert.strictEqual(response.count, 1);
    assert.strictEqual(response.isTruncated, true);
  });

  it('Can list all pools summary', async function() {
    const pools = await Qarnot.pools.summaries();
    assert.isArray(pools);
    assert.exists(pools.find(t => t.uuid === createdPoolUuid));
    assert.exists(pools.find(t => t.uuid === clonedPoolUuid));
  });

  it('Can list all pools summary with pagination', async function() {
    const response = await Qarnot.pools.summaries_paginate(1);
    assert.isArray(response.data);
    assert.strictEqual(response.count, 1);
    assert.strictEqual(response.isTruncated, true);
  });

  it('Can close of a pool', async function() {
    await Qarnot.pools.close(createdPoolUuid);
    const pool = await Qarnot.pools.get(createdPoolUuid);
    assert.strictEqual(pool.state, 'Closing');
  });

  it('Can delete a pool', async function() {
    await Qarnot.pools.delete(createdPoolUuid);
    await Qarnot.pools.delete(clonedPoolUuid);
    const pools = await Qarnot.pools.list();
    assert.isArray(pools);
    const deletedPool = pools.find(t => t.uuid === createdPoolUuid);
    if (deletedPool) {
      assert.strictEqual(deletedPool.state, 'PendingDelete');
    } else {
      assert.notExists(deletedPool);
    }
  });
});
