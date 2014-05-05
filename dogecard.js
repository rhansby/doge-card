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
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
}),
    Card = many_mongoose.model('Card', card_schema);

var subscriber_schema = new many_mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    is_subscribed: Boolean
}),
    Subscriber = many_mongoose.model('Subscriber', subscriber_schema);


// Very helper functions:
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
};

var themeToTitle = {
    birthday: 'Wow such happy birfday! very +7 doge-years!',
    cinco: 'Wow mucho Cinco de Mayo! Muy celebración',
    easter: 'Wow many Happy Easter! very chocolate',
    general: 'Wow very greeting, best shibes 5ever! #bsf',
    stpattys: 'Wow such lucky charms',
    valentine: 'Wow so happy valentine\'s day!!!'
};

var isValidTheme = function(theme) {
    var valid_themes = Object.keys(themeToTitle);
    return (valid_themes.indexOf(theme) >= 0);
};

String.prototype.escapeHTML = function() {
    return this
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};


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

// JSON endpoint. Needs to be before regular endpoint for routing reasons.
such_app.get('/view/:such_card_id.json', function (req, res) {
    Card.findOne({id: req.params.such_card_id}, function(error, card) {
        if (! card || error) {
            res.status(404).json({error: 'wow such 404'});
            return;
        }

        res.json({
            theme: card.theme,
            from: card.from,
            to: card.to,
            message: card.message,
            date: card.date,
            views: card.views
        });
    });
});

such_app.get('/view/:such_card_id', function (req, res) {
    // Fetch card and increment its views simultaneously
    Card.findOneAndUpdate({id: req.params.such_card_id}, {$inc: {views: 1}}, function(error, card) {
        if (! card || error) {
            res.status(404).render('404');
            return;
        }

        res.render('card', {
            theme: card.theme,
            title: themeToTitle[card.theme],
            to: card.to,
            from: card.from,
            message: card.message.replace(/\n/g, '<br>\n')
        });
    });
});

such_app.get('/create', function (req, res) {
    res.render('create');
});

such_app.post('/create', function (req, res) {
    var body = req.body;
    if (body.theme && isValidTheme(body.theme) && body.to && body.from && body.message) {
        body.theme = body.theme.escapeHTML();
        body.to = body.to.escapeHTML();
        body.from = body.from.escapeHTML();
        body.message = body.message.escapeHTML();

        body.id = generateRandomID();
        var card = new Card(body);
        card.save(function() {
            res.redirect('/view/' + body.id);
        });
    }
    else {
        res.render('create', {
            error: 'Wow such oops. Something is missing or wrong. Such try again.',
            theme: body.theme,
            to: body.to,
            from: body.from,
            message: body.message
        });
    }
});

such_app.get('/subscribe', function (req, res) {
    var email = req.query.email;

    // Wow such email verification:
    // One or more chars + @ + one or more chars + . + one or more chars
    var is_valid = /.+@.+\..+$/.test(email);

    if (! is_valid) {
        res.send(400, 'wow');
        return;
    }

    var subscriber = new Subscriber({email: email, is_subscribed: true});
    subscriber.save(function() {
        res.send(201, 'wow');
    });
});

such_app.get('*', function(req, res){
    res.status(404).render('404');
});
