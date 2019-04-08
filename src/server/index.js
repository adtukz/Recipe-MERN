const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('.models/User');
const withAuth = require('/middleware.js');

const server = express();

const dbname = 'heroku_43nn2z2x'; // change to match your database name

const secret = 'secret_should_not_be_in_git';

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());
server.use(cookierParser());

// URL to our DB - will be loaded from an env variable or will use local DB
const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, { useNewUrlParser: true}, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`)
  }
});

server.use(express.static(path.join(__dirname, 'public')));

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// define the various endpoints

server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/api/about', function(req, res) {
  res.send('Welcome!');
});

server.get('/api/secret', withAuth, function(req, res) {
  res.send('This is a secret page');
});

server.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

server.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

server.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

server.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

// retrieve all user objects from DB
server.get('/api/recipes', (req, res) => {
  db.collection('recipes').find().toArray((err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

server.get('/api/recipes/:id', (req, res) => {
  Recipe.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// delete recipe with specific ID from DB
server.delete('/api/recipes', (req, res) => {
  db.collection('recipes').deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// update user based on info supplied in request body
server.put('/api/recipes', (req, res) => {

  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;

  // find a user matching this ID and update their details
  db.collection('recipes').updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

// create new recipe based on info supplied in request body
server.post('/api/recipe', (req, res) => {
  db.collection('recipes').insertOne(req.body, (err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

server.listen(process.env.PORT || 8080);
