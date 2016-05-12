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
	})
	ipcRenderer.send('msg-findAll', {});

	//
	$scope.addOneTask = function(task){
		alert("123");
		if(task.trim()){
			var _task = {
				text: task.trim()
			}
			ipcRenderer.send('msg-addOne', _task);
		}
	}
})