const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const server = express();
const dbname = 'recipeDB'; // change to match your database name

// serve files from the dist directory
server.use(express.static('dist'));

// URL to our DB - will be loaded from an env variable or will use local DB
const dbroute = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;

let db;

// connect to the db and start the express server
MongoClient.connect(dbroute, (err, client) => {
  if (err) throw err;

  db = client.db(dbname);
  // start the express web server listening
  server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// define the various endpoints

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
