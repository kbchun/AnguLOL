angular.module('server.request', []);

.factory('PlayerInfo', function($http) {
  var urlGame = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/';


  
  var urlPlayerInfo = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
});


var getGames = (options, callback) => {
  var url = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/';
  var summonerID = options.id;

  $.ajax({
    url: url + summonerID + '/recent' + options.key,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var trimmedData = dataCleaner(data.games);
      callback(trimmedData);
    },
    error: function(error) {
      console.log('error: ' + error);
    }
  });
};

var searchRiot = (options, callback) => {
  var url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
  $.ajax({
    url: url + options.summoner + options.key,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      options['id'] = data[(options.summoner).toLowerCase()]['id'];
      getGames(options, callback);
    },
    error: function(error) {
      console.log('error: ' + error);
    }
  });
};
