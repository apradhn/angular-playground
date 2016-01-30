var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('view engine', 'jade');

app.get('/todo', function(req, res) {
    res.render('todo/index.jade');
});

app.get('/project', function(req, res) {
    res.render('project/index.jade');
})

app.get('/pokedex', function(req, res) {
    res.render('pokedex/index.jade');
})

app.get('/invoice', function(req, res) {
    res.render('invoice/index.jade');
})

app.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})