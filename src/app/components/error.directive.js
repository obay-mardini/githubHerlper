(function(){
	angular
		.module('app.landing')
		.directive('error', function() {
			return {
				restrict: 'E',
				scope: {
					error: '<'
				},
				controller: function() {
				},
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/templates/error-template.html'
			}		
		})
})();