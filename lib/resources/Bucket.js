const AWS = require('aws-sdk');

/** @namespace buckets */
class Bucket {
  constructor(userClass, config) {
    this._userClass = userClass;
    this._config = config;
    this._s3client;
  }

  async getS3Client() {
    if (this._s3client) return this._s3client;
    const userInfo = await this._userClass.get();
    const email = userInfo.email;
    this._s3client = new AWS.S3({
      endpoint: this._config.storageUrl,
      accessKeyId: email,
      secretAccessKey: this._config.auth,
    });
    return this._s3client;
  }

  /** List all buckets<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property}
   * @memberof buckets
   * @name listBuckets
   * @function
   * @example <caption>Usage</caption>
   * const buckets = await Qarnot.buckets.listBuckets();
   * console.log(buckets);
   * @example <caption>Output</caption>
   * {
   *    Buckets: [
   *      { Name: 'my-bucket', CreationDate: 2019-06-11T12:59:43.743Z }
   *    ],
   *    Owner: { DisplayName: 'john.doe', ID: 'xx$xx' }
   * }
   * @returns {Promise<Object>} List of all buckets
   */
  async listBuckets() {
    const s3Client = await this.getS3Client();
    return s3Client.listBuckets().promise();
  }

  /** Create a new bucket<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property}
   * @memberof buckets
   * @name createBucket
   * @function
   * @param {String} bucketName name of the bucket to create
   * @example <caption>Usage</caption>
   * await Qarnot.buckets.createBucket('my-bucket');
   * @returns {Promise}
   */
  async createBucket(bucketName) {
    const s3Client = await this.getS3Client();
    return s3Client
      .createBucket({
        Bucket: bucketName,
        CreateBucketConfiguration: {
          LocationConstraint: '',
        },
      })
      .promise();
  }

  /** Delete a bucket<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucket-property}
   * @memberof buckets
   * @name deleteBucket
   * @function
   * @param {String} bucketName name of the bucket to delete
   * @example <caption>Usage</caption>
   * await Qarnot.buckets.deleteBucket('my-bucket-to-delete');
   * @returns {Promise}
   */
  async deleteBucket(bucketName) {
    const s3Client = await this.getS3Client();
    return s3Client
      .deleteBucket({
        Bucket: bucketName,
      })
      .promise();
  }

  /** Upload data in a bucket <br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property}
   * @memberof buckets
   * @name upload
   * @function
   * @param {String} bucketName name of the bucket
   * @param {String} fileName name of the file to create
   * @param {Buffer|ReadableStream|String} data data to upload
   * @example <caption>Usage</caption>
   * const file = await Qarnot.buckets.upload('my-bucket', 'file.txt', data);
   * console.log(file);
   * @example <caption>Output</caption>
   * {
   *   ETag: '"5eb63bbbe01eeed093cb22bb8f5acdc3"',
   *   Location: 'https://my-bucket.storage.qarnot.com/file.txt',
   *   key: 'file.txt',
   *   Key: 'file.txt',
   *   Bucket: 'my-bucket'
   * }
   * @returns {Promise<Object>} Object describing the created file
   */
  async upload(bucketName, fileName, data) {
    const s3params = {
      Bucket: bucketName,
      Key: fileName,
      Body: data,
    };
    const s3Client = await this.getS3Client();
    return s3Client.upload(s3params).promise();
  }

  /** Download content of a file in a bucket<br>
   *  see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#download-property}
   * @name download
   * @memberof buckets
   * @function
   * @param {String} bucketName name of the bucket
   * @param {String} fileName name of the file to create
   * @example <caption>Usage</caption>
   * const data = await Qarnot.buckets.download('my-bucket', 'file.txt', params);
   * console.log(data)
   * console.log(data.Body.toString())
   * @example <caption>Output</caption>
   * {
   *    AcceptRanges: 'bytes',
   *    LastModified: 2019-06-11T20:13:17.000Z,
   *    ContentLength: 11,
   *    ETag: '"5eb63bbbe01eeed093cb22bb8f5acdc3"',
   *    ContentType: 'application/octet-stream',
   *    Metadata: {},
   *    Body: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
   * }
   * hello world
   * @returns {Promise<Buffer>} File info and content
   */
  async download(bucketName, fileName, params = {}) {
    const s3params = Object.assign(params, {
      Bucket: bucketName,
      Key: fileName,
    });
    const s3Client = await this.getS3Client();
    return s3Client.getObject(s3params).promise();
  }

  /** List all files in a bucket<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property}
   * @name listFiles
   * @memberof buckets
   * @function
   * @param {String} bucketName name of the bucket
   * @param {Object} [params] custom params object for the storage API (see code and aws s3 sdk documentation)
   * @example <caption>Usage</caption>
   * const files = await Qarnot.buckets.listFiles('my-bucket');
   * console.log(files);
   * @example <caption>Output</caption>
   * {
   *   IsTruncated: false,
   *   Contents: [{
   *     Key: 'file.txt',
   *     LastModified: 2019-06-11T20:13:17.862Z,
   *     ETag: '"5eb63bbbe01eeed093cb22bb8f5acdc3"',
   *     Size: 11,
   *     StorageClass: 'STANDARD',
   *     Owner: [Object]
   *   }],
   *   Name: 'my-bucket',
   *   Prefix: '',
   *   MaxKeys: 1000,
   *   CommonPrefixes: []
   * }
   * @returns {Promise<Object>} Files in your bucket
   */
  async listFiles(bucketName, params = {}) {
    const s3Params = Object.assign(params, { Bucket: bucketName });
    const s3Client = await this.getS3Client();
    return s3Client.listObjectsV2(s3Params).promise();
  }

  /** Delete a file in a bucket
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property}
   * @name deleteFile
   * @memberof buckets
   * @function
   * @example
   * await Qarnot.buckets.deleteFile('my-bucket', 'file.txt');
   * @returns {Promise}
   */
  async deleteFile(bucketName, fileName) {
    const s3Client = await this.getS3Client();
    return s3Client
      .deleteObject({
        Bucket: bucketName,
        Key: fileName,
      })
      .promise();
  }
}

module.exports = Bucket;
