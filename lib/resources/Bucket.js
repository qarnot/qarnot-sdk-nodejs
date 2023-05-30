const { Upload } = require('@aws-sdk/lib-storage');
const {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

/** @namespace buckets */
class Bucket {
  constructor(userClass, config) {
    this._userClass = userClass;
    this._config = config;
    this._s3client = null;
  }
  /* Related doc
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/
   */
  async getS3Client() {
    if (this._s3client === null) {
      // It handles two ways of setting up client to be backward compatible with old version of this sdk
      if (this._config?.storage?.accessKeyId) {
        this._s3client = new S3Client({
          region: 'default',
          endpoint: this._config.storageUrl,
          credentials: {
            accessKeyId: this._config.storage.accessKeyId,
            secretAccessKey: this._config.storage?.secretAccessKey ? this._config.storage.secretAccessKey : this._config.auth,
          },
          s3ForcePathStyle: this._config.s3ForcePathStyle,
        });
      } else {
        const userInfo = await this._userClass.get();
        this._s3client = new S3Client({
          region: 'default',
          endpoint: this._config.storageUrl,
          credentials: {
            accessKeyId: userInfo.email,
            secretAccessKey: this._config.auth,
          },
          s3ForcePathStyle: this._config.s3ForcePathStyle,
        });
      }
    }
    return this._s3client;
  }

  async sendCommand(command) {
    const s3client = await this.getS3Client();

    return s3client.send(command);
  }

  /** List all buckets<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listbucketscommand.html}
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
   * @returns {Object} List of all buckets
   */
  async listBuckets() {
    const command = new ListBucketsCommand({});

    return this.sendCommand(command);
  }

  /** Create a new bucket<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/createbucketcommand.html}
   * @memberof buckets
   * @name createBucket
   * @function
   * @param {String} bucketName name of the bucket to create
   * @example <caption>Usage</caption>
   * await Qarnot.buckets.createBucket('my-bucket');
   * @returns {Object}
   */
  async createBucket(bucketName) {
    const command = new CreateBucketCommand({
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: '',
      },
    });
    return this.sendCommand(command);
  }

  /** Delete a bucket<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/deletebucketcommand.html}
   * @memberof buckets
   * @name deleteBucket
   * @function
   * @param {String} bucketName name of the bucket to delete
   * @example <caption>Usage</caption>
   * await Qarnot.buckets.deleteBucket('my-bucket-to-delete');
   * @returns {Promise}
   */
  async deleteBucket(bucketName) {
    const command = new DeleteBucketCommand({
      Bucket: bucketName,
    });
    return this.sendCommand(command);
  }

  /** Upload data in a bucket <br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_storage.html}
   * @memberof buckets
   * @name upload
   * @function
   * @param {String} bucketName name of the bucket
   * @param {String} fileName name of the file to create
   * @param {Buffer|ReadableStream|String} data data to upload
   * @example <caption>Usage</caption>
   * const file = await Qarnot.buckets.upload('my-bucket', 'file.txt', data, mimetype);
   * console.log(file);
   * @example <caption>Output</caption>
   *  {
   *   ETag: '"f7482490035aa20e0bed1375d44e97bf"',
   *   Bucket: 'test-suite-nodejs',
   *   Key: 'test.txt',
   *   Location: 'https://test-suite-nodejs.storage.qarnot.com/test.txt'
   * }
   * @returns {Promise<Object>} Object describing the created file
   */
  async upload(bucketName, fileName, data, mimetype) {
    const upload = new Upload({
      client: await this.getS3Client(),
      params: {
        Bucket: bucketName,
        Key: fileName,
        Body: data,
        ContentType: mimetype,
      },
    });
    return upload.done();
  }

  /** Download content of a file in a bucket<br>
   *  see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/getobjectcommand.html}
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
   * @returns {Promise<Buffer>} File info and content <br>
   * More info see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/getobjectcommandoutput.html}
   */
  async download(bucketName, fileName, params = {}) {
    const s3params = Object.assign(params, {
      Bucket: bucketName,
      Key: fileName,
    });
    const command = new GetObjectCommand(s3params);

    return this.sendCommand(command);
  }

  /** List all files in a bucket<br>
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectsv2command.html}
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
   *   Contents: [
   *     {
   *       Key: 'test.txt',
   *       LastModified: 2023-05-30T09:30:53.873Z,
   *       ETag: '"f7482490035aa20e0bed1375d44e97bf"',
   *       Size: 17,
   *       StorageClass: 'STANDARD'
   *     }
   *   ],
   *   IsTruncated: false,
   *   KeyCount: 1,
   *   MaxKeys: 1000,
   *   Name: 'test-suite-nodejs',
   *   Prefix: ''
   * }
   * @returns {Promise<Object>} Files in your bucket
   */
  async listFiles(bucketName, params = {}) {
    const s3Params = Object.assign(params, { Bucket: bucketName });
    const command = new ListObjectsV2Command(s3Params);

    return this.sendCommand(command);
  }

  /** Delete a file in a bucket
   * see: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/deleteobjectcommand.html}
   * @name deleteFile
   * @memberof buckets
   * @function
   * @example
   * await Qarnot.buckets.deleteFile('my-bucket', 'file.txt');
   * @returns {Promise}
   */
  async deleteFile(bucketName, fileName) {
    const command = new DeleteObjectCommand({ Bucket: bucketName, Key: fileName });
    return this.sendCommand(command);
  }
}

module.exports = Bucket;
