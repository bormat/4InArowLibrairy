	app.directive('myTouchstart', function() {
		return function(scope, element, attr) {
			scope.P4 = element;
			element.on('touchstart', function(event) { 
				scope.$apply()
				scope.$eval(attr.myTouchstart); 
			});
		}			
	})

	app.directive('myTouchmove', function() {
		return function(scope, element, attr) {
			scope.P4 = element
			element.on('touchmove', function(event) { 
				scope.$apply()
				scope.$eval(attr.myTouchmove); 
			});
		}
	})

	app.directive('myTouchend', function() {
		return function(scope, element, attr) {
			scope.P4 = element
			element.on('touchend ', function(event) {
					scope.$apply()
					scope.$eval(attr.myTouchend); 
			});
		};
	})