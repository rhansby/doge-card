var very_express = require('express'),
    so_handlebars = require('express3-handlebars'),
    much_http = require('http'),
    such_app = very_express();

such_app.engine('handlebars', so_handlebars({defaultLayout: 'main'}));
such_app.set('view engine', 'handlebars');

such_app.use(very_express.static(__dirname + '/public'));
such_app.set('port', process.env.PORT || 3000);

much_http.createServer(such_app).listen(such_app.get('port'), function() {
  console.log('Wow very listen on port ' + such_app.get('port'));
});

such_app.get('/', function (req, res) {
    res.render('home');
});
