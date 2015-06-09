	var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope){
		$c=$scope;
		$scope.firstName= "John";
		$scope.lastName= "Doe";
		$c.path = "http://bormat2.free.fr/4InArowLibrairy/";
		$c.grille = new Array(41);
		$c.grille.push(0);
		
	});
	
