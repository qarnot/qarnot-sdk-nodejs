const QarnotSDK = require('../index');
const assert = require('chai').assert;
const config = require('./config_test');

const Qarnot = new QarnotSDK({
  auth: config.token,
});

const BUCKET_NAME = 'test-suite-nodejs';
const FILE_NAME = 'test.txt';

describe('Storage', function() {
  it('Can create a bucket', async function() {
    await Qarnot.buckets.createBucket(BUCKET_NAME);
    const buckets = await Qarnot.buckets.listBuckets();
    const bucketCreated = buckets.Buckets.find(s => s.Name === BUCKET_NAME);
    assert.exists(bucketCreated);
  });
  it('Can list all buckets', async function() {
    const buckets = await Qarnot.buckets.listBuckets();
    assert.isObject(buckets);
    assert.isArray(buckets.Buckets);
    const bucketCreated = buckets.Buckets.find(s => s.Name === BUCKET_NAME);
    assert.exists(bucketCreated);
  });

  it('Can upload a file', async function() {
    const file = await Qarnot.buckets.upload(BUCKET_NAME, FILE_NAME, 'test-suite-nodejs');
    assert.isObject(file);
    assert.strictEqual(file.Key, FILE_NAME);
    assert.strictEqual(file.Bucket, BUCKET_NAME);
  });

  it('Can list files in bucket', async function() {
    const files = await Qarnot.buckets.listFiles(BUCKET_NAME);
    assert.isObject(files);
    assert.isArray(files.Contents);
    const createdFile = files.Contents.find(s => s.Key === FILE_NAME);
    assert.exists(createdFile);
  });

  it('Can download a file', async function() {
    const data = await Qarnot.buckets.download(BUCKET_NAME, FILE_NAME);
    assert.strictEqual(await data.Body.transformToString(), 'test-suite-nodejs');
  });

  it('Can delete a file', async function() {
    await Qarnot.buckets.deleteFile(BUCKET_NAME, FILE_NAME);
    const files = await Qarnot.buckets.listFiles(BUCKET_NAME);
    const createdFile = files.Contents?.find(s => s.Key === FILE_NAME && s.Bucket === BUCKET_NAME);
    assert.notExists(createdFile);
  });

  it('Can delete a bucket', async function() {
    await Qarnot.buckets.deleteBucket(BUCKET_NAME);
    const buckets = await Qarnot.buckets.listBuckets();
    assert.isObject(buckets);
    assert.isArray(buckets.Buckets);
    const bucketCreated = buckets.Buckets?.find(s => s.Name === BUCKET_NAME);
    assert.notExists(bucketCreated);
  });
});
