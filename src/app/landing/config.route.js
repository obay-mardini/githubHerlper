(function() {
    'use strict'

    angular
        .module('app.landing')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
      $routeProvider.when('/landing', {
          templateUrl: 'app/landing/landing.html',
          controller: 'landing',
          controllerAs: 'vm'
      });
    }
})();