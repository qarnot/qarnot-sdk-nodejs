# Qarnot NodeJS SDK 
[![Known Vulnerabilities](https://snyk.io//test/github/qarnot/qarnot-sdk-nodejs/badge.svg?targetFile=package.json)](https://snyk.io//test/github/qarnot/qarnot-sdk-nodejs?targetFile=package.json)
[![Build status](https://travis-ci.org/qarnot/qarnot-sdk-nodejs.svg?branch=master)](https://travis-ci.org/qarnot/qarnot-sdk-nodejs)

This package allows you to use [Qarnot](https://www.qarnot.com/) cloud computing service.

## Installation

```sh
npm install @qarnot/sdk
```

## Links

  - [SDK documentation](https://computing.qarnot.com/documentation/sdk-nodejs/)
  - [SDK repository](https://github.com/qarnot/qarnot-sdk-nodejs)
  - [General documentation](https://computing.qarnot.com/developers/overview/qarnot-computing-home)
  - [Qarnot computing portal](https://computing.qarnot.com)
  - [REST API documentation](https://computing.qarnot.com/documentation/api/)

## Usage

-   Create a Qarnot account and get your API token: [Account](https://account.qarnot.com).
-   Monitor your tasks and manage your data: [Console](https://console.qarnot.com).

-   SDK initialization

    ```js
    const QarnotSDK = require('@qarnot/sdk');
    const Qarnot = new QarnotSDK({
        auth:'secret_token' // Retrieve your token from https://account.qarnot.com
    });
    ```

### Run you first task !

```js
await Qarnot.tasks.run({
  name: 'helloworld',
  profile: 'docker-batch',
  instanceCount: 4,
  constants: [{
    key: 'DOCKER_CMD',
    value: 'echo hello world from node ${INSTANCE_ID}!'
  }]
});
/* Output:
2> hello world from node 2!
1> hello world from node 1!
0> hello world from node 0!
3> hello world from node 3!
*/
```

_NB. This method returns only when the task is completed. For long running task you might want to check the submit method_

### Create a task with ressources

```js
await Qarnot.buckets.createBucket('my-input-bucket');
await Qarnot.buckets.upload('my-input-bucket', 'input.txt', 'hello world !');
await Qarnot.buckets.createBucket('my-output-bucket');
await Qarnot.tasks.run({
  name: 'helloworld-withdata',
  profile: 'docker-batch',
  instanceCount: 1,
  resourceBuckets: [
    'my-input-bucket',
  ],
  resultBucket : 'my-output-bucket',
  constants: [{
    key: 'DOCKER_CMD',
    value: 'sh -c "cat input.txt | rev > output.txt"'
  }]
});
const result = await Qarnot.buckets.download('my-output-bucket', 'output.txt');
console.log(result.Body.toString());
/* Output:
! dlrow olleh
*/
```

## Example

You can find examples in the `test` directory of the [github repository](https://github.com/qarnot/qarnot-sdk-nodejs)

## Contributions

Pull requests and github issues are welcome.

## License

Licensed under Apache 2.0