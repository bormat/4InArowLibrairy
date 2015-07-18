	app.directive('mytOuchstart', function() {
		return function(scope, element, attr) {
			scope.P4 = element;
			element.on('touchstart', function(event) { 
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchstart); 
				});
			});
		}			
	})

	app.directive('mytOuchmove', function() {
		return function(scope, element, attr) {
			scope.P4 = element
			element.on('touchmove', function(event) { 
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchmove); 
				});
			});
		}
	})

	app.directive('mytOuchend', function() {
		return function(scope, element, attr) {
			scope.P4 = element
			element.on('touchend ', function(event) {
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchend); 
				});
			});
		};
	})