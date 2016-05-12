/*jshint esversion: 6 */
const ipcRenderer = require('electron').ipcRenderer;

angular.module('todo.controllers', [])
.controller('mainControl', function($scope, $timeout) {
	//init
	$scope.todos = [];
	ipcRenderer.on('reply-findAll', function(event, arg){
		$timeout(function() {
			$scope.todos = arg;
		}, 0);
	});
	ipcRenderer.on('reply-addOne', function(event, arg){
		$timeout(function(){
			$scope.todos.push(arg);
		}, 0);
	});
	ipcRenderer.send('msg-findAll', {});

	//
	$scope.addOneTask = function(){
		if($scope.task.trim()){
			var _task = {
				text: $scope.task.trim()
			};
			ipcRenderer.send('msg-addOne', _task);
		}
		$scope.task = "";
	};
});