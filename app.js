// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.use('/public', express.static('./src/assets'))
app.set('views', './src/pages'); // telling express where to find template files 
app.set('view engine', 'ejs');// integrating ejs with express

// use res.render to load up an ejs view file

// index page 
app.get('/:page.html', function(req, res) {
    res.render(req.params.page);
});

app.listen(8080);
console.log('8080 is the magic port');