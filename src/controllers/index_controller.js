indexApp.controller('index.controller', function($scope, PlayerInfo) {
  $scope.search_input = '';
  $scope.search = function() {
    console.log($scope.search_input);
  };
});