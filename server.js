// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', function (req, res) {
  const unix = Date.now();
  const utc = new Date().toUTCString();
  console.log(unix, utc);
  res.json({ unix, utc });
});

app.get('/api/timestamp/:date', function (req, res) {
  const date = req.params.date;
  // if 5 or more numbers, it's a timestamp
  if (/\d{5,}/.test(date)) {
    date_int = parseInt(date);
    res.json({ unix: date_int, utc: new Date(date_int).toUTCString() });
  }

  const date_string = new Date(date);
  if (date_string === 'Invalid Date') res.json({ error: 'Invalid Date' });
  const timestamp = date_string.valueOf();
  const utc = date_string.toUTCString();
  res.json({ unix: timestamp, utc: utc });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
