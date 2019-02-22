const express = require('express');
const app = express();
const port = 3300;
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
const fs = require('fs');
const bodyParser = require('body-parser');

let users ; /*fs.readFile('mock-users.json', 'utf8' , function (err, data) {
  if (err) throw err;
  users = JSON.parse( data );
});*/

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

app.get('/', function (req, res) {
  /*fs.readFile('mock-users.json', 'utf8' , function (err, data) {
    if (err) throw err;
    users = JSON.parse( data );
    res.send(users);
  });*/
  let readData = async () => {
    try {
      const response = await client.search({});
      users = response.hits.hits;
      console.log(response.hits.hits)
    } catch (error) {
      console.trace(error.message)
    }
  };
  readData();
  res.send(users);
});

app.delete('/delete_user/:id', function (req, res) {


  /*for(let i = 0; i < users.length; i++)
  {
    if(users[i].id === +req.params.id)
    {
      users.splice(i, 1);
      let newUsers = JSON.stringify(users);
      fs.writeFile('mock-users.json', newUsers, function (err) {
        if (err) throw err;
      });
      break;
    }
  }
  res.send(users);*/
});

app.post('/create', function (req, res) {
  if(!req.body) return res.sendStatus(400);
  else {
    readData = async () => {
      try {
        const response = await client.index({
          index: 'datauser',
          type: 'user',
          body: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email
          }
        });
      } catch (error) {
        console.trace(error.message)
      }
    };

    readData();
    res.send();
  }

  /*users.push(req.body);
  let newUsers = JSON.stringify(users);
  fs.writeFile('mock-users.json', newUsers, function (err) {
    if (err) throw err;
  });
  res.send("Ok");*/
});

app.post('/change_user/:id', function (req,res) {

  for (let i = 0; i < users.length; i++)
  {
    if(users[i].id === +req.params.id)
    {
      users.splice(i, 1, req.body);
      let newUsers = JSON.stringify(users);
      fs.writeFile('mock-users.json', newUsers, function (err) {
        if (err) throw err;
      });
      break;
    }
  }

  res.send("User Change");
})

app.listen(port);
