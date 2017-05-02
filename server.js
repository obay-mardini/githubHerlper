var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

var passwords = require('./src/passwords.js');

// connect to mongoDB
mongoose.connect('mongodb://localhost/myappdatabase');

app.use(bodyParser.json());
console.log(__dirname + '\\' + 'src')
app.use(express.static(__dirname + '\\' + 'src'));

app.get('/getRepos/:userName', function(req, res) {
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
    if(err) console.log(err);
    if(body) res.json(body)
  });
});

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


module.exports = app;