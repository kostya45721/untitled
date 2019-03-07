const express = require('express');
const app = express();
const port = 3300;
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
const bodyParser = require('body-parser');

let users;

app.use( (req, res, next) => {
  let origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
    res.header('Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type, Accept, X-API-Key, X-CSRF-TOKEN, Pragma, Cache-Control, If-Modified-Since');
  next();
});
app.use(bodyParser.json());

app.get('/users', function (req, res) {
  let readData = async () => {
    try {
      const response = await client.search({ size: '20' });
      users = response.hits.hits;
      res.send(users);
    } catch (error) {
      console.trace(error.message)
    }
  };
  readData();
});

app.get('/user/:id', function (req, res) {
  let readData = async () => {
    try {
      const response = await client.get({
        index: 'datauser',
        type: 'user',
        id: req.params.id,
      });
      users = response;
      res.send(users);
    } catch (error) {
      res.sendStatus(404);
    }
  };
  readData();
})

app.delete('/user/:id', function (req, res) {
  let readData = async () => {
    try {
      const response = await client.delete({
        index: 'datauser',
        type: 'user',
        id: req.params.id,
        refresh: true
      });
      res.send(response);
    } catch (error) {
      console.trace(error.message)
    }
  };
  readData();
});

app.post('/user', function (req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
      try {
        const response = await client.index({
          index: 'datauser',
          type: 'user',
          refresh: true,
          body: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            dateOfBirth: req.body.dateOfBirth,
            dateOfAdded: req.body.dateOfAdded,
            dateOfChanged: req.body.dateOfChanged
          }
        });
        res.send(response);
      } catch (error) {
        console.trace(error.message)
      }
    };

    readData();
  }
});

app.put('/user/:id', function (req,res) {
  let readData = async () => {
    try {
      const response = await client.update({
        index: 'datauser',
        type: 'user',
        id: req.params.id,
        refresh: true,
        body: {
          doc:  {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            dateOfBirth: req.body.dateOfBirth,
            dateOfAdded: req.body.dateOfAdded,
            dateOfChanged: req.body.dateOfChanged
          }
        }
      });
      res.send(response);
    } catch (error) {
      console.trace(error.message)
    }
  };
  readData();
});

app.listen(port);


module.exports.app = app;
