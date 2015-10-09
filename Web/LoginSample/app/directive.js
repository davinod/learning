/**
 * focus – This directive focus on the desired form element on page load
 * password-match – Used to check if both the password and confirm password are same in our user signup page
 */
app.directive(‘focus’, function() {
	return function(scope, element) {
		element[0].focus();
	}
});

app.directive(‘passwordMatch’, [function () {
	return {
		restrict: ‘A’,
		scope:true,
		require: ‘ngModel’,
		link: function (scope, elem , attrs,control) {
			var checker = function () {
				var e1 = scope.$eval(attrs.ngModel);
				var e2 = scope.$eval(attrs.passwordMatch);
				if(e2!=null)
					return e1 == e2;
			};
			scope.$watch(checker, function (n) {
				control.$setValidity("passwordNoMatch", n);
			});
		}
	};
}]);