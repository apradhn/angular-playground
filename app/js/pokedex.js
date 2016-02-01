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
.controller('PokeController', ['$scope', 'pokeFactory', '$filter', function($scope, pokeFactory, $filter) {
    var self = this;
    self.team = {members: {}, attack: 0, defense: 0, sp_atk: 0, sp_df: 0, speed: 0, hp: 0};

    pokeFactory.get().then(function(response) {
        $scope.pokemon = response.data.pokemon;
        $scope.pk_names = Object.keys(response.data.pokemon);
    })

    $scope.search = function(searchText) {
        matches = $filter('filter')($scope.pk_names, $scope.searchText);
        self.results = {};
        angular.forEach(matches, function(match) {
            var pk = $scope.pokemon[match];
            _setResults(pk);
        });
    }

    $scope.random = function() {
        var max = Object.keys($scope.pk_names).length;
        var min = 1;
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        var randomName = $scope.pk_names[randomNumber];
        var pk = $scope.pokemon[randomName];
        self.results = {};
        _setResults(pk);
    }

    self.removeFromTeam = function(pk) {
        delete self.team.members[pk.name];
        _setAverages(pk);
    }

    $scope.addToTeam = function(pk) {
        self.team.members[pk.name] = pk;
        delete self.results[pk.name];
        _setAverages(pk);
    }

    var _setResults = function(pk) {
        pokeFactory.getStats(pk.id).then(function(response) {
            pk.attack = response.data.attack;
            pk.defense = response.data.defense;
            pk.sp_atk = response.data.sp_atk;
            pk.sp_df = response.data.sp_def;
            pk.speed = response.data.sp_def;
            pk.hp = response.data.hp;
            pk.types = response.data.types;
        });
        self.results[pk.name] = pk;
    }

    var _setAverages = function(pk, options) {
        self.team.attack = _average('attack');
        self.team.defense = _average('defense');
        self.team.sp_atk = _average('sp_atk');
        self.team.sp_df = _average('sp_df');
        self.team.speed = _average('speed');
        self.team.hp = _average('hp');
    }

    var _average = function(attr, options) {
        var length = Object.keys(self.team.members).length;
        if (length === 0) {
            return 0;
        } else {
            var total = 0;
            angular.forEach(self.team.members, function(pk) {
                total += pk[attr]
            })
            return Math.round(total / length);              
        }
    }

    var _drawGraph = function(attr, pk) {

    }

}])