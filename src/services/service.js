angular.module('server.request', [])

.factory('PlayerInfo', function($http) {
  var urlPlayerInfo = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
  var getPlayerInfo = function(name) {
    return $http({
      method: 'GET',
      url: urlPlayerInfo + name + window.RIOT_API_KEY
    })
    .then(function(res) {
      return [res.data[name].id, res.data[name].name];
    });
  };


  var urlGame = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/';
  var getPlayerGames = function(summonerID) {
    return $http({
      method: 'GET',
      url: urlGame + summonerID + '/recent' + window.RIOT_API_KEY
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    getPlayerInfo: getPlayerInfo,
    getPlayerGames: getPlayerGames
  };
});
