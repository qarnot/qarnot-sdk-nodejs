const QarnotSDK = require('../index');
const config = require('./config_test');

const qarnot = new QarnotSDK(config);

let jobWithTaskUuid, emptyJobUuid;

describe('Jobs', function () {
  test('Can create a job', async function () {
    const job = await qarnot.jobs.create({
      name: 'job-with-task',
      useDependencies: false,
    });
    jobWithTaskUuid = job.uuid;
    expect(job.uuid).toEqual(expect.any(String));
    expect(job.uuid.length).toStrictEqual(36);
  });

  test('Can submit a task in a job', async function () {
    const task = await qarnot.tasks.submit({
      name: 'task-in-job',
      profile: 'docker-batch',
      instanceCount: 1,
      jobUuid: jobWithTaskUuid,
      constants: [
        {
          key: 'DOCKER_CMD',
          value: 'sleep 600',
        },
      ],
    });
    expect(task.uuid).toEqual(expect.any(String));
  });

  test('Cannot delete a job with tasks without force', async function () {
    let errorResponse;
    await qarnot.jobs.delete(jobWithTaskUuid).catch((err) => (errorResponse = err));
    expect(errorResponse.status).toStrictEqual(403);
  });

  test('Can force delete a job with tasks', async function () {
    await qarnot.jobs.delete(jobWithTaskUuid, { force: true });
    const jobs = await qarnot.jobs.list();
    expect(jobs).toEqual(expect.any(Array));
    const deletedJob = jobs.find((j) => j.uuid === jobWithTaskUuid);
    if (deletedJob) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedJob.state).not.toStrictEqual('Active');
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedJob).toBeUndefined();
    }
  });

  test('Can delete an empty job without force', async function () {
    const job = await qarnot.jobs.create({
      name: 'empty-job',
      useDependencies: false,
    });
    emptyJobUuid = job.uuid;
    await qarnot.jobs.delete(emptyJobUuid);
    const jobs = await qarnot.jobs.list();
    const deletedJob = jobs.find((j) => j.uuid === emptyJobUuid);
    if (deletedJob) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedJob.state).not.toStrictEqual('Active');
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(deletedJob).toBeUndefined();
    }
  });
});
