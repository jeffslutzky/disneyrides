var express = require('express');
var handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main'});

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

app.use(function(req, res, next){
  res.type('text/html');
  res.status(404);
  res.send('404 - Not Found');
})

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log("Express started on http://localhost:" + app.get('port') + "; press CTRL-C to terminate");
});
