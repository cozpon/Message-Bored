//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const db = require('./models');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const redis = require('connect-redis')(session);
const path = require('path');
const saltRounds = 12; //about 3 sec.

const app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use('/api', routes);


app.get('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

app.use(session({
  store: new redis(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

///start authentication
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done) => {
  console.log('serializing');
  console.log(user, "USER");
  console.log(done, "DONE");
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  db.users.findOne({ where: {id: user.id}})
    .then(user => {
      return done(null, {
        id: user.id,
        username: user.username

      });
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
  db.users.findOne({where: {username : username}})
  .then(user => {
    if(user === null) {
      return done(null, false, {message: 'bad username or password'});
    }else{
      bcrypt.compare(password, user.password)
      .then(res => {
        console.log(res);
        if(res) {return done(null, user);
        }else{
          return done(null, false, {message: 'bad username or password'});
        }
      });
    }
  })
  .catch(err => {
    console.log('error : ', err);
  });
}));

//routes
app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/api/logout', (req, res) => {
  req.logout();
});

app.post('/api/register', (req,res) => {
  console.log(req.body);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      db.users.create({
        username: req.body.username,
        password: hash
      })
      .then((user) => {
        console.log(user, "HEY");
        res.json(user);
      })
      .catch((err) => {
        console.log("error", err);
        return res.send('Stupid username');
      });
    });
  });
});


//secure route for logged in users
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {res.redirect('/login.html');}
}


app.listen(port, () => {
  db.sequelize.sync({ force : false });
  console.log("Server's UP" + `${port}`);
});