var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var passwords = require('./src/passwords.js');

// connect to mongoDB
mongoose.connect('mongodb://localhost/myappdatabase');

// create repos schema
var repoSchema = new Schema({
  name: String,
  username: String,
  url: {type: String, unique: true},
  notes: String
});

var Repos = mongoose.model('Repos', repoSchema);

app.use(bodyParser.json());
app.use(express.static(__dirname  + '/src'));

app.get('/savedRepos/:username', function(req, res) {
  Repos.find({username: req.params.username}).exec(function(err, repos) {
    if(err) res.send(404, 'Error: ' + err);
    res.json(repos)
  });
})


app.delete('/deleteRepo/:id', function(req, res){
  Repos.find({_id: req.params.id}).remove().exec(function(err, data) {
    if(err) res.status(404).end(err)
    if(data) res.end('deleted')
  });
});
app.post('/saveRepo/:username', function(req, res) {
  var repo = req.body;
  var newRepo = new Repos({
    name: repo.name,
    username: req.params.username,
    url: repo.url
  });

  newRepo.save(function(err) {
    if(err) {
      console.log(err);
      res.send(404, 'Error:', err)                                                                                                                                                                                                                                                                  
    } else {
      console.log('repo saved successfully')
      res.send(201,repo)
    }

  });
});

app.get('/getRepos/:userName', function(req, res) {
  var options = {
   uri: 'https://api.github.com/users/' + req.params.userName + '?access_token=' + passwords.API_KEY,
   method: 'GET',
   headers: {
       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       'Accept': 'application/json',
       'User-agent': 'obay-mardini'
   }
  };
  if(req.params.userName === 'obay-mardini') {
    res.redirect('/owner');
  } else {
    request(options, function(err, response, body) {
      if(err) console.log(err);
      if(response.statusCode == 404) res.status(404).end('Not Found');
      if(JSON.parse(body).type === 'Organization') {
        res.redirect(301, '/orgs/' + req.params.userName)
      } else if(JSON.parse(body).type === 'User') {
        res.redirect('/users/' + req.params.userName)
      } 
    });
  }
});

app.get('/owner', function(req, res) {
  var options = {
   uri: 'https://api.github.com/user/repos?access_token=' + passwords.API_KEY,
   method: 'GET',
   headers: {
       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       'Accept': 'application/json',
       'User-agent': 'obay-mardini'
   }
  };
  request(options, function(err, response, body) {
    if(err) res.status(401).json(err);
    if(body) {res.status(200).json(body)}
  })
})
app.get('/orgs/:userName', function(req, res) {
  var options = {
   uri: 'https://api.github.com/orgs/' + req.params.userName + '/repos?access_token=' + passwords.API_KEY,
   method: 'GET',
   headers: {
       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       'Accept': 'application/json',
       'User-agent': 'obay-mardini'
   }
  };
  request(options, function(err, response, body) {
    if(err) res.status(404).end(err);
    if(body) res.status(200).json(body);
  })
})

app.get('/users/:userName', function(req, res) {
  var options = {
   uri: 'https://api.github.com/users/' + req.params.userName + '/repos?access_token=' + passwords.API_KEY,
   method: 'GET',
   headers: {
       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       'Accept': 'application/json',
       'User-agent': 'obay-mardini'
   }
  };
  request(options, function(err, response, body) {
    if(err) res.status(404).end(err);
    if(body) res.status(200).json(body);
  })
})

app.get('/forkRepo/:repoName/:userName', function(req, res) {
  var options = {
    uri: 'https://api.github.com/repos/' + req.params.userName + '/' + req.params.repoName + '/forks?access_token=' + passwords.API_KEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json',
      'User-agent': 'obay-mardini'
    }
  }
  request(options, function(err, response, body) {
    if(err) console.log(err);
    if(body) res.json(body)
  })
})

app.get('/addNote/:reponame/:notes', function(req, res) {
  Repos.find({name: req.params.reponame}).update({notes: req.params.notes}).exec(function(err, repos) {
    if(err) res.status(404).send('err', err)
    if(repos) res.json(repos)
  });
})

module.exports = app;

