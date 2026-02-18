const QarnotSDK = require('../index');
const config = require('./config_test');

const qarnot = new QarnotSDK(config);

const BUCKET_NAME = 'test-suite-nodejs';
const FILE_NAME = 'test.txt';

describe('Storage', function () {
  test('Can create a bucket', async function () {
    await qarnot.buckets.createBucket(BUCKET_NAME);
    const buckets = await qarnot.buckets.listBuckets();
    const bucketCreated = buckets.Buckets.find((s) => s.Name === BUCKET_NAME);
    expect(bucketCreated).toBeDefined();
  });
  test('Can list all buckets', async function () {
    const buckets = await qarnot.buckets.listBuckets();
    expect(buckets).toMatchObject({});
    expect(buckets.Buckets).toEqual(expect.any(Array));
    const bucketCreated = buckets.Buckets.find((s) => s.Name === BUCKET_NAME);
    expect(bucketCreated).toBeDefined();
  });

  test('Can upload a file', async function () {
    const file = await qarnot.buckets.upload(BUCKET_NAME, FILE_NAME, 'test-suite-nodejs');
    expect(file).toMatchObject({});
    expect(file.Key).toStrictEqual(FILE_NAME);
    expect(file.Bucket).toStrictEqual(BUCKET_NAME);
  });

  test('Can list files in bucket', async function () {
    const files = await qarnot.buckets.listFiles(BUCKET_NAME);
    expect(files).toMatchObject({});
    expect(files.Contents).toEqual(expect.any(Array));
    const createdFile = files.Contents.find((s) => s.Key === FILE_NAME);
    expect(createdFile).toBeDefined();
  });

  test('Can download a file', async function () {
    const data = await qarnot.buckets.download(BUCKET_NAME, FILE_NAME);
    expect(await data.Body.transformToString()).toStrictEqual('test-suite-nodejs');
  });

  test('Can delete a file', async function () {
    await qarnot.buckets.deleteFile(BUCKET_NAME, FILE_NAME);
    const files = await qarnot.buckets.listFiles(BUCKET_NAME);
    const createdFile = files.Contents?.find((s) => s.Key === FILE_NAME && s.Bucket === BUCKET_NAME);
    expect(createdFile).toBeUndefined();
  });

  test('Can delete a bucket', async function () {
    await qarnot.buckets.deleteBucket(BUCKET_NAME);
    const buckets = await qarnot.buckets.listBuckets();
    expect(buckets).toMatchObject({});
    expect(buckets.Buckets).toEqual(expect.any(Array));
    const bucketCreated = buckets.Buckets?.find((s) => s.Name === BUCKET_NAME);
    expect(bucketCreated).toBeUndefined();
  });
});
