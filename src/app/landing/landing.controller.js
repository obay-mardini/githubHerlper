(function() {
  angular
    .module('app.landing')
    .controller('landing', landingController);

    landingController.$inject = ['$http'];

    function landingController($http) {
      var vm = this;
      vm.repos = [];
      vm.getRepos = function(userName) {
        $http({
          method: 'GET',
          url: 'http://localhost:8080/getRepos/' + userName
        }).then(function successCallback(response) {
            vm.repos = JSON.parse(response.data);
            console.log(vm.repos.length)
          }, function errorCallback(response) {
            console.log(response)
          });
      }
      vm.forkRepo = function(repo) {
        vm.repos.find((element)=> {return element === repo}).forkedUrl = {
          "git_url": "git://github.com/obay-mardini/obay2016.github.io.git",
          "ssh_url": "git@github.com:obay-mardini/obay2016.github.io.git"
        };
        vm.repos = vm.repos;
        console.log(repo.forkedUrl)
        // $http({
        //   method: 'GET',
        //   url: 'http://localhost:8080/forkRepo/' + repo.name + '/' + repo.owner.login
        // }).then(function successCallback(response) {
        //     console.log(response.data)
        //   }, function errorCallback(response) {
        //     console.log(response)
        //   });
      }
    }
})();
