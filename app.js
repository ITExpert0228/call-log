var express = require('express');
var app = express(); // the main app
var admin = express();

admin.set("view options", {layout: false});
admin.use(express.static(__dirname + '/public/admin'));

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.render('index.html');
// res.redirect('/secret');
});

// var secret = express();
// secret.get('/', function (req, res) {
//   console.log(secret.mountpath); // /secr*t
//   res.send('Admin Secret');
// });

// admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/admin', '/manager', '/admin/*', '/manager/*'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.all('/admin*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname + '/public/admin' });
});


// app.get('/', function(req, res) {
//     res.render('index.html');
// });
app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname + '/public' });
});

// catch 404
app.use(function (req, res, next) {

  var min=404; 
  var max=408;  
  var random =Math.floor(Math.random() * (+max - +min)) + +min;

  res.status(404).sendFile(__dirname + '/public/404/' + random+ '.html');
});

// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

var port = 5000;
app.listen(port, () => {console.log('Server is up and running on port numner ' + port);});