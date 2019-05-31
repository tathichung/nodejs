var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var port=3000;
var shortid = require('shortid')

var low = require('lowdb')
var FileSync = require ('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json');
db = low(adapter)
db.defaults({users: [] })
  .write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', function(req, res){
    res.render('index', {
       name: 'Thu'
    });
});
app.get('/users', function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res){
    var q= req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    })
})
app.get('/users/create', function(req, res){
    res.render('users/create');
})

app.get('/users/:id', function(req, res){
   var id = req.params.id;
   var user= db.get('users').find({ id:id}).value();
   res.render('users/views', {
       user: user
   })
})
app.post('/users/create', function(req, res){
    req.body.id = shortid.generate();
   db.get('users').push(req.body).write();
   res.redirect('/users')
})
app.listen(port, function() {
    console.log('Server listening on port' + port);
})
