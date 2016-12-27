import angular from 'angular';

import AuthenticationStore from '../authentication/services/authenticationStore.js'

const storesModule = angular.module('storesModule', [])
    .service('authenticationStore', AuthenticationStore);

export default storesModule.name;
