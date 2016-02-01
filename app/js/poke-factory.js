angular.module('pokedex', [])
.factory('pokeFactory', function() {
    var service = {};
    service.getJson = function() {
        var json = require('../scripts/pokemon.json');
        return json
    }

    service.getNames = function() {
        var json = require('../scripts/pokemon.json');
        var names = json['pokemon_names'];
        return names;
    }

    return service
})