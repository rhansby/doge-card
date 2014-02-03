var many_mongoose = require('mongoose'),
    very_express = require('express'),
    so_handlebars = require('express3-handlebars'),
    much_http = require('http'),
    such_app = very_express();


// Much database configuration:
var connect = function() {
    many_mongoose.connect('mongodb://localhost/doge-card');
};
connect();

many_mongoose.connection.on('error', console.error.bind(console, 'Wow such DB connection error:'));
many_mongoose.connection.on('disconnected', function() {
  connect();
});

var card_schema = new many_mongoose.Schema({
    id: String,
    theme: String,
    to: String,
    from: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
}),
    Card = many_mongoose.model('Card', card_schema);


// Very helper function:
var generateRandomID = function() {
    var possible_doge = ['wow', 'such', 'very', 'many', 'much', 'so'],
        possible_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        id, i;

    id = possible_doge[Math.floor(Math.random() * possible_doge.length)] + '-';

    for(i = 0; i < 7; ++i) {
        id += possible_letters[Math.floor(Math.random() * possible_letters.length)];
    }

    // TODO: Search database to make sure a card with this key does not exist
    return id;
}


// Wow, rest of app:
such_app.engine('handlebars', so_handlebars({defaultLayout: 'main'}));
such_app.set('view engine', 'handlebars');

such_app.use(very_express.bodyParser());
such_app.use(very_express.static(__dirname + '/public'));
such_app.set('port', process.env.PORT || 3000);

much_http.createServer(such_app).listen(such_app.get('port'), function() {
  console.log('Wow very listen on port ' + such_app.get('port'));
});

such_app.get('/', function (req, res) {
    res.render('home');
});

such_app.get('/view/:such_card_id', function (req, res) {
    console.log(req.params.such_card_id);

    Card.find({id: req.params.such_card_id}, function(error, cards) {
        if (! cards) {
            // TODO: Proper 404.
            res.send('404');
        }
        else {
            var card = cards[0];
            res.render('card', {
                theme: card.theme,
                to: card.to,
                from: card.from,
                message: card.message
            });
        }
    });
});

such_app.get('/create', function (req, res) {
    res.render('create');
});

such_app.post('/create', function (req, res) {
    console.log(req.body);
    var body = req.body;
    if (body.theme && body.to && body.from && body.message) {
        body.id = generateRandomID();
        var card = new Card(body);
        card.save();

        res.redirect('/view/' + body.id);
    }
    else {
        // TODO: Indicate failure.
        res.render('create');
    }
});
