(function(){
	angular
		.module('app.landing')
		.directive('panel', function() {
			return {
				restrict: 'E',
				scope: {
					started: '<',
					repos: '<',
					savedVideos: '<',
					saveRepo: '<',
					forkRepo: '<',
					deleteRepo: '<',
					addNote: '<'
				},
				controller: function() {
					console.log(this)
				},
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/templates/repos-panel.html'
			}		
		})
})();