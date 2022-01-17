const Resource = require('./Resource');

/** @namespace profiles */
class Profile extends Resource {
  constructor(httpClient) {
    super(httpClient);
    this.baseURL = '/profiles';
  }

  /** List available profiles<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Profiles-Profiles}
   * @function
   * @name list
   * @memberof profiles
   * @example <caption>Usage</caption>
   * const profiles = await Qarnot.profiles.list();
   * console.log(profiles);
   * @example <caption>Output</caption>
   * [
   *   'blender',
   *   'docker-batch',
   *   'python',
   *   ...
   * ]
   * @returns {Promise<String[]>}
   */
  list() {
    return this.httpClient.get(this.baseURL);
  }

  /** Get a profile's details<br>
   * see: {@link https://qarnot.com/documentation/api/#api-Profiles-Profile_details}
   * @function
   * @name get
   * @memberof profiles
   * @param name {String} name of the profile
   * @example <caption>Usage</caption>
   * const profile = await Qarnot.profiles.get('docker-batch');
   * console.log(profile);
   * @example <caption>Output</caption>
   * {
   *   name: null,
   *   constants: [
   *     {
   *       name: 'DOCKER_REPO',
   *       value: 'library/ubuntu',
   *       description: 'Docker image to use. E.g: library/ubuntu ' +
   *         '(official images must be prefixed by ' +
   *         "'library/')"
   *     },
   *     {
   *       name: 'DOCKER_TAG',
   *       value: 'latest',
   *       description: 'Docker tag. E.g: latest, trusty, ...'
   *     },
   *     {
   *       name: 'DOCKER_REGISTRY_LOGIN',
   *       value: '',
   *       description: 'Your login on the Docker Hub, if you ' +
   *         'want to use your private Docker images'
   *     },
   *     {
   *       name: 'DOCKER_REGISTRY_PASSWORD',
   *       value: '',
   *       description: 'Your password on the Docker Hub, if you ' +
   *         'want to use your private Docker images'
   *     },
   *     {
   *       name: 'DOCKER_USER',
   *       value: '',
   *       description: 'The user the command will be run as. Leave empty ' +
   *         'to use the default user from your Docker image.'
   *     },
   *     {
   *       name: 'DOCKER_HOST',
   *       value: '',
   *       description: 'The hostname inside the container'
   *     },
   *     {
   *       name: 'DOCKER_CMD',
   *       value: '',
   *       description: 'The command to run in the container. ' +
   *         'The ENTRYPOINT and CMD are honored.'
   *     },
   *     {
   *       name: 'DOCKER_PROGRESS1',
   *       value: '',
   *       description: 'One of the Regex used for progress ' +
   *         'tracking. See developer documentation for ' +
   *         'details.'
   *     },
   *     {
   *       name: 'DOCKER_PROGRESS2',
   *       value: '',
   *       description: 'Another of the Regex used for progress ' +
   *         'tracking. See developer documentation for ' +
   *         'details.'
   *     },
   *     {
   *       name: 'DOCKER_PROGRESS3',
   *       value: '',
   *       description: 'Another of the Regex used for progress ' +
   *         'tracking. See developer documentation for ' +
   *         'details.'
   *     },
   *     {
   *       name: 'DOCKER_WORKDIR',
   *       value: '${DOCKER_WORKDIR}',
   *       description: 'Set task working directory (will be passed as -w to ' +
   *         'docker). This does NOT change the               ' +
   *         'location of resources and where results should be ' +
   *         'written, this location is still found in the $TASK_PATH ' +
   *         'env variable. '
   *     }
   *   ]
   * }
   * @returns {Promise<Object>}
   */
  get(profileName) {
    return this.httpClient.get(`${this.baseURL}/${profileName}`);
  }
}

module.exports = Profile;
