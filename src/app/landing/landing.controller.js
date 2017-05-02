(function() {
  angular
    .module('app.landing')
    .controller('landing', landingController);

    landingController.$inject = ['$http'];

    function landingController($http) {
      var vm = this;
      vm.userName = 'obay-mardini';
      vm.savedVideos = false;
      vm.error = false;
      vm.repos = [];
      vm.started = false;

      vm.getRepos = function(userName) {
        vm.started = true;
        $http({
          method: 'GET',
          url: 'http://localhost:8080/getRepos/' + userName
        }).then(function successCallback(response) {
            vm.repos = JSON.parse(response.data);
            vm.savedVideos = false;
            vm.error = false;
          }, function errorCallback(response) {
            vm.error = 'The user name is not correct!'
            vm.repos = [];
          });
      }
      vm.forkRepo = function(repo) {
        vm.repos = vm.repos;
        console.log(repo)
        $http({
          method: 'GET',
          url: 'http://localhost:8080/forkRepo/' + repo.name + '/' + repo.owner.login
        }).then(function successCallback(response) {
            vm.repos.find((element)=> {return element === repo}).forkedUrl = {
              git_url: JSON.parse(response.data).html_url,
              ssh_url: JSON.parse(response.data).ssh_url
            };
          }, function errorCallback(response) {
            console.log(response)
          });
      }

      vm.getSavedRepos = function() {
        vm.started = true;
        $http({
          method: 'GET',
          url: 'http://localhost:8080/savedRepos/' + vm.userName
        }).then(function successCallback(response) {
            vm.savedVideos = true;
            vm.repos = response.data;
          }, function errorCallback(response) {
            vm.error = "Can you try again in a moment!"
          });
      }

      vm.saveRepo = function(repo) {
        $http.post('http://localhost:8080/saveRepo/' + vm.userName, repo)
          .success(function(data, status) {
            console.log(data);
          })  
          .error(function(data, status) {
            console.log(data)
          });
      }
    }
})();
