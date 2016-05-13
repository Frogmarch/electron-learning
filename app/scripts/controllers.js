/*jshint esversion: 6 */
const ipcRenderer = require('electron').ipcRenderer;

angular.module('todo.controllers', [])
  .controller('mainControl', function($scope, $timeout, $mdDialog) {
    //init
    $scope.todos = [];
    ipcRenderer.on('reply-findAll', function(event, arg) {
      $timeout(function() {
        $scope.todos = arg;
        console.log($scope.todos);
      }, 0);
    });
    ipcRenderer.send('msg-findAll', {});

    //
    $scope.addOneTask = function() {
      if ($scope.task.trim()) {
        var _task = {
          text: $scope.task.trim(),
          createdAt: new Date().valueOf(),
          checked: false
        };
        ipcRenderer.send('msg-addOne', _task);
      }
      $scope.task = "";
    };
    ipcRenderer.on('reply-addOne', function(event, arg) {
      $timeout(function() {
        $scope.todos.push(arg);
      }, 0);
    });

    //
    $scope.removeOneTask = function(id) {
      if (id) {
        ipcRenderer.send('msg-removeOne', id);
      }
    }
    ipcRenderer.on('reply-removeOne', function(event, arg) {
      $timeout(function() {
        $scope.todos = arg;
      }, 0);
    })

    //
    $scope.updateOneTask = function(todo) {
      if (todo) {
        ipcRenderer.send('msg-updateOne', todo);
      }
    }

    //
    $scope.deleteTask = function(todo) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Navigating')
        .textContent('Inspect ')
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
      );
    }
  });
