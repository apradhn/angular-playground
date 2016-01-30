angular.module('pokedex', [])
.factory('pokeFactory', function($http) {
    return {
        get: function() {
            return $http.get('pokemon.json');
        },
        getStats: function(id) {
            return $http.get('http://pokeapi.co/api/v1/pokemon/' + id + '/')
        },
    }
})
.directive('pkSearch', function() {
    return {
        templateUrl: 'partials/pk-search'
    }
})
.directive('pkSearchResults', function() {
    return {
        restrict: 'E',
        scope: {
            searchResults: '=searchResults',
            team: '=team'
        },
        controller: function($scope) {
            $scope.addToTeam = function(pk) {
                $scope.team[pk.name] = pk;
                delete $scope.searchResults[pk.name];
            }
        },
        templateUrl: 'partials/pk-search-results'
    }
})
.directive('pkTeam', function() {
    return {
        restrict: 'E',
        scope: {
            team: '=team',
            searchResults: '=searchResults'
        },
        controller: function($scope) {
            $scope.removeFromTeam = function(pk) {
                delete $scope.team[pk.name];
            }
        },
        templateUrl: 'partials/pk-team'
    }
})
.controller('PokeController', ['$scope', 'pokeFactory', '$filter', function($scope, pokeFactory, $filter) {
    var self = this;
    self.team = {};
    $scope.$watch('team', function(team) {
        $scope.team = team;
    })

    pokeFactory.get().then(function(response) {
        $scope.pokemon = response.data.pokemon;
        $scope.pk_names = Object.keys(response.data.pokemon);
    })

    $scope.search = function() {
        matches = $filter('filter')($scope.pk_names, $scope.searchText);
        self.searchResults = {};
        angular.forEach(matches, function(match) {
            var pk = $scope.pokemon[match];
            pokeFactory.getStats(pk.id).then(function(response) {
                pk.attack = response.data.attack;
                pk.defense = response.data.defense;
                pk.sp_atk = response.data.sp_atk;
                pk.sp_df = response.data.sp_def;
                pk.speed = response.data.sp_def;
                pk.hp = response.data.hp;
                pk.types = response.data.types;
            });
            self.searchResults[pk.name] = pk;
        });
    }

    $scope.random = function() {
        self.searchResults = {};
        var max = Object.keys($scope.pk_names).length;
        var min = 1;
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        var randomName = $scope.pk_names[randomNumber];
        var pk = $scope.pokemon[randomName];
            pokeFactory.getStats(pk.id).then(function(response) {
                pk.attack = response.data.attack;
                pk.defense = response.data.defense;
                pk.sp_atk = response.data.sp_atk;
                pk.sp_df = response.data.sp_def;
                pk.speed = response.data.sp_def;
                pk.hp = response.data.hp;
                pk.types = response.data.types;
            });
        self.searchResults[pk.name] = pk;
    }
}])