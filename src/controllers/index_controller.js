indexApp.controller('index.controller', function($scope, PlayerInfo) {
  $scope.search_input = '';
  $scope.game_data = [];
  $scope.single_game_data;
  $scope.game_data_bool = false;
  $scope.username = '';
  $scope.username_bool = false;

  $scope.search = function(keyVal) {
    if (keyVal === 13 || keyVal === undefined) {
      PlayerInfo.getPlayerInfo($scope.search_input)
        .then(function(profile) {
          $scope.username = profile[1];
          return PlayerInfo.getPlayerGames(profile[0]);
        })
        .then(function(gameData) {
          var trimmedData = dataCleaner(gameData.games);
          $scope.game_data = trimmedData;
        });
      $scope.game_data_bool = false;
      $scope.username_bool = true;
      $scope.search_input = '';
    }
  };

  $scope.gameDetail = function(game) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $scope.single_game_data = game;
    $scope.game_data_bool = true;
  };

  var dataCleaner = function(results) {
    var data = [];
    for (var game in results) {
      var champion = window.champData.data[results[game].championId].name;
      var champImg = window.champData.data[results[game].championId].key;
      var stats = results[game].stats;
      var utcSeconds = results[game].createDate;
      var d = new Date(utcSeconds);
      data.push({
        'champion': champion,
        'gameMode': results[game].gameMode,
        'win': stats.win ? 'Win' : 'Loss',
        'totalDamageDealtToChampions': stats.totalDamageDealtToChampions || 0,
        'totalDamageTaken': stats.totalDamageTaken || 0,
        'wardsPlaced': stats.wardPlaced || 0,
        'wardsKilled': stats.wardKilled || 0,
        'playerRole': stats.playerRole,
        'assists': stats.assists || 0,
        'deaths': stats.numDeaths || 0,
        'largestMultiKill': stats.largestMultiKill || 0,
        'kills': stats.championsKilled || 0,
        'largestKillingSpree': stats.largestKillingSpree || 0,
        'timePlayed': (stats.timePlayed / 60).toFixed(2),
        'ipEarned': results[game].ipEarned,
        'date': d.toLocaleString(),
        'champImg': champImg
      });
    }
    return data;
  };
});

indexApp.directive('gameSingleInfo', function() {
  return {
    template: `<img src="http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/{{single_game_data.champImg}}.png"></img>
              <div class="champ-name">
                <span class="stat-title">Champion: </span>
                {{single_game_data.champion}}
              </div>
              <div class="game-name">
                <span class="stat-title">Mode: </span>
                {{single_game_data.gameMode}}
              </div>
              <div class="game-result">
                <span class="stat-title">Result: </span>
                {{single_game_data.win}}
              </div>
              <div class="damage-dealt">
                <span class="stat-title">Total Damage Dealt to Champions: </span>
                {{single_game_data.totalDamageDealtToChampions}}
              </div>
              <div class="damage-taken">
                <span class="stat-title">Total Damage Taken: </span>
                {{single_game_data.totalDamageTaken}}
              </div>
              <div class="wards-placed">
                <span class="stat-title">Wards Placed: </span>
                {{single_game_data.wardsPlaced}}
              </div>
              <div class="wards-killed">
                <span class="stat-title">Wards Killed: </span>
                {{single_game_data.wardsKilled}}
              </div>
              <div class="player-role">
                <span class="stat-title">Player Role: </span>
                {{single_game_data.totalDamageTaken}}
              </div>
              <div class="assists">
                <span class="stat-title">Assits: </span>
                {{single_game_data.totalDamageTaken}}
              </div>
              <div class="deaths">
                <span class="stat-title">Deaths: </span>
                {{single_game_data.deaths}}
              </div>
              <div class="largest-multi-kill">
                <span class="stat-title">Largest Multi Kill: </span>
                {{single_game_data.largestMultiKill}}
              </div>
              <div class="kills">
                <span class="stat-title">Kills: </span>
                {{single_game_data.kills}}
              </div>
              <div class="largest-killing-spree">
                <span class="stat-title">Largest Killing Spree: </span>
                {{single_game_data.largestKillingSpree}}
              </div>
              <div class="time-played">
                <span class="stat-title">Time Played: </span>
                {{single_game_data.timePlayed}}
              </div>
              <div class="ip-earned">
                <span class="stat-title">IP Earned: </span>: 
                {{single_game_data.ipEarned}}
              </div>

              `
  };
});
