const QarnotSDK = require('../index');
const config = require('./config_test');

const qarnot = new QarnotSDK(config);

let createdTaskUuid;

describe('Tasks', function() {
  test('Can submit a task', async function() {
    const task = await qarnot.tasks.submit({
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
    expect(task).toMatchObject({});
    expect(task.uuid).toEqual(expect.any(String));
    expect(task.uuid.length).toStrictEqual(36);
  });

  test("Can fetch task's carbon facts", async function() {
    const carbonFacts = await qarnot.tasks.getCarbonFacts(createdTaskUuid);
    expect(carbonFacts).toMatchObject({});
  });

  test('Can list all tasks', async function() {
    const tasks = await qarnot.tasks.list();
    expect(tasks).toEqual(expect.any(Array));
    expect(tasks.find(t => t.uuid === createdTaskUuid)).toBeDefined();
  });

  test('Can get a task', async function() {
    const task = await qarnot.tasks.get(createdTaskUuid);
    expect(task).toMatchObject({});
    expect(task.uuid).toStrictEqual(createdTaskUuid);
  });

  test('Can get port forwarding', async function() {
    const portForward = await qarnot.tasks.getPortForwarding(createdTaskUuid);
    expect(portForward).toMatchObject({ '0': {} })
  });

  test('Can get specific task instance stdout', async function() {
    const instanceStdout = await qarnot.tasks.instanceStdout(createdTaskUuid, 2);
    expect(instanceStdout).toEqual('');
  });

  test('Can get specific task instance stderr', async function() {
    const instanceStderr = await qarnot.tasks.instanceStderr(createdTaskUuid, 2);
    expect(instanceStderr).toEqual('');
  });

  test('Can abort a task', async function() {
    await qarnot.tasks.abort(createdTaskUuid);
    const task = await qarnot.tasks.get(createdTaskUuid);
    expect(task.state).toMatch(/PendingCancel|Cancelled/);
  });

  test('Can list all summaries', async function() {
    const summaries = await qarnot.tasks.summaries();
    expect(summaries).toEqual(expect.any(Array));
    expect(summaries.find(t => t.uuid === createdTaskUuid)).toBeDefined();
  });

  test('Can delete a task', async function() {
    await qarnot.tasks.delete(createdTaskUuid);
    const summaries = await qarnot.tasks.summaries();
    expect(summaries).toEqual(expect.any(Array));
    const deletedTask = summaries.find(t => t.uuid === createdTaskUuid);
    if (deletedTask) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedTask.state).toStrictEqual('PendingDelete');
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedTask).toBeUndefined();
    }
  });

  // test('Can run a task', async function() {
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
