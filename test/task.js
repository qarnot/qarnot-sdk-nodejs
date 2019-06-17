const QarnotSDK = require('../index');
const assert = require('chai').assert;
const config = require('./config_test');

const Qarnot = new QarnotSDK({
  auth: config.token,
});

let createdTaskUuid;

describe('Tasks', function() {
  it('Can submit a task', async function() {
    const task = await Qarnot.tasks.submit({
      name: 'helloworld',
      profile: 'docker-batch',
      instanceCount: 4,
      constants: [
        {
          key: 'DOCKER_CMD',
          value: 'echo hello world from node ${INSTANCE_ID}!',
        },
      ],
    });
    createdTaskUuid = task.uuid;
    assert.isObject(task);
    assert.isString(task.uuid);
    assert.lengthOf(task.uuid, 36);
  });

  it('Can list all tasks', async function() {
    const tasks = await Qarnot.tasks.list();
    assert.isArray(tasks);
    assert.exists(tasks.find(t => t.uuid === createdTaskUuid));
  });

  it('Can get a task', async function() {
    const task = await Qarnot.tasks.get(createdTaskUuid);
    assert.isObject(task);
    assert.strictEqual(task.uuid, createdTaskUuid);
  });

  it('Can abort a task', async function() {
    await Qarnot.tasks.abort(createdTaskUuid);
    const task = await Qarnot.tasks.get(createdTaskUuid);
    assert.oneOf(task.state, ['PendingCancel', 'Cancelled']);
  });

  it('Can list all summaries', async function() {
    const summaries = await Qarnot.tasks.summaries();
    assert.isArray(summaries);
    assert.exists(summaries.find(t => t.uuid === createdTaskUuid));
  });

  it('Can delete a task', async function() {
    await Qarnot.tasks.delete(createdTaskUuid);
    const summaries = await Qarnot.tasks.summaries();
    assert.isArray(summaries);
    const deletedTask = summaries.find(t => t.uuid === createdTaskUuid);
    if (deletedTask) {
      assert.strictEqual(deletedTask.state, 'PendingDelete');
    } else {
      assert.notExists(deletedTask);
    }
  });

  // it('Can run a task', async function() {
  //   this.timeout(3 * 60 * 1000);
  //   const task = await Qarnot.tasks.run({
  //     name: 'helloworld',
  //     profile: 'docker-batch',
  //     instanceCount: 1,
  //     constants: [
  //       {
  //         key: 'DOCKER_CMD',
  //         value: 'echo hello world from node ${INSTANCE_ID}!',
  //       },
  //     ],
  //   });
  // });
});
