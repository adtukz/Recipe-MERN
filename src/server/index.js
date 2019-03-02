const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const path = require('path');

const server = express();

server.use(express.static('dist'));

// URL to our DB
const dbRouteLocal = 'mongodb://localhost:27017/MyMongoDB';
const dbRoute = 'mongodb+srv://mongouser:iadtajs@cluster0-qecqg.mongodb.net/MyMongoDB?retryWrites=true';

// connect to the db and start the express server
let db;
// connects our back end code with the database
MongoClient.connect(dbRoute, (err, client) => {
  if (err) throw err;

  db = client.db('MyMongoDB');
  db.collection('Users').find().toArray((err, result) => {
    if (err) throw err;

    console.log(result);
  });
  // start the express web server listening on 8080
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// define the various endpoints

server.get('/api/users', (req, res) => {
  db.collection('Users').find().toArray((err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

server.get('/api/users/:id', (req, res) => {
  db.collection('Users').findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

server.delete('/api/users', (req, res) => {
  db.collection('Users').deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    return res.send({ success: true });
  });
});

server.post('/api/users', (req, res) => {
  db.collection('Users').insertOne(req.body, (err, result) => {
    if (err) throw err;

    console.log('saved to database');
    res.redirect('/');
  });
});

server.put('/api/users', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  db.collection('Users').updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});
