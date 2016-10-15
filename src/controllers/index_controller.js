indexApp.controller('index.controller', function($scope, PlayerInfo) {
  $scope.search_input = '';

  $scope.search = function() {
    PlayerInfo.getPlayerInfo($scope.search_input);
  };
});