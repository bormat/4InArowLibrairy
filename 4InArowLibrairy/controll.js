
	angular.module('project', ['mongolab']).
	  config(function($routeProvider) {
		$routeProvider.
		  when('/list', {controller:ListCtrl, template:'view_home.html'}).
		  otherwise({redirectTo:'/list'});
		  
		 
	  });
 return angularAMD.bootstrap(app)

function ListCtrl($scope) {
  $scope.projects = "a";
}



// This is a module for cloud persistance in mongolab - https://mongolab.com
app=angular.module('mongolab', ['ngResource']);
   app.factory('Project', function($resource) {

    });
