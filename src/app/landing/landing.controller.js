(function() {
  angular
    .module('app.landing')
    .controller('landing', landingController);

    landingController.$inject = [$http];

    function landingController($http) {
      console.log('hello2')
      var vm = this;
    }
})();
