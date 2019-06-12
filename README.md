# Qarnot NodeJS SDK

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

-   Register for a Qarnot account (15€ free credits !) and get your API token: [Account](https://account.qarnot.com).
-   Monitor your tasks and manage your data: [Console](https://console.qarnot.com).

-   SDK initialization

    ```js
    const QarnotSDK = require('@qarnot/sdk');
    const qarnot = new QarnotSDK({
        auth:'secret_token' // Retrieve from your Qarnot Developer Console interface
    });
    ```

### Run you first task !

```js
await qarnot.task.run({
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
await qarnot.buckets.createBucket('my-input-bucket');
await qarnot.buckets.upload('my-input-bucket', 'input.txt', 'hello world !');
await qarnot.buckets.createBucket('my-output-bucket');
await qarnot.task.run({
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
const result = await qarnot.buckets.download('my-output-bucket', 'output.txt');
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