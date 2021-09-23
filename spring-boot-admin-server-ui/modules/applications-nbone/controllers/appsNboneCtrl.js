/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var angular = require('angular');

module.exports = function ($scope,$http, application, $interval) {
  'ngInject';

  $scope.application = application;
  $scope.metrics = null;
  $scope.refreshInterval = 1;
  $scope.refresher = null;

  var convert = function (response) {
    delete response.data['_links'];
    return response;
  };

  application.getRedis = function () {
    return $http.get('api/applications/' + this.id + '/redis').then(convert);
  };

  $scope.refresh = function () {

    application.getInfo().then(function (response) {
      $scope.info = response.data;
    }).catch(function (response) {
      $scope.error = response.data;
    });

    application.getRedis().then(function (response) {
      $scope.redis = response.data;
    }).catch(function (response) {
      $scope.redis = response.data;
    });

  };

  $scope.start = function () {
    $scope.refresher = $interval(function () {
      $scope.refresh();
    }, $scope.refreshInterval * 1000);
  };

  $scope.stop = function () {
    if ($scope.refresher !== null) {
      $interval.cancel($scope.refresher);
      $scope.refresher = null;
    }
  };

  $scope.toggleAutoRefresh = function () {
    if ($scope.refresher === null) {
      $scope.start();
    } else {
      $scope.stop();
    }
  };

  $scope.$on('$destroy', function () {
    $scope.stop();
  });

  $scope.refresh();
};
