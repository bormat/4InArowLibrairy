
define([path3+'js/angularAMD.js', 'angular-route'], function (angularAMD) {
  var app = angular.module("webapp", ['ngRoute']);
  app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", angularAMD.route({
        templateUrl: path3+'view_view1.html', controller: 'HomeCtrl', controllerUrl: 'controller_home'
    }))
    .when("/view1", angularAMD.route({
        templateUrl: path3+'view_view1.html', controller: 'View1Ctrl', controllerUrl: 'controller_view1'
    }))
	.when("/view2", angularAMD.route({
        templateUrl: path3+'view_view2.html', controller: 'View2Ctrl', controllerUrl: 'controller_view2'
    }))
    .otherwise({redirectTo: "view1"});
  });
  
  return angularAMD.bootstrap(app);
});