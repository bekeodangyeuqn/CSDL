var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var port = process.env.PORT || 6969;

var app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors());

const reminderRoute = require('./routes/reminders');

app.use('/reminders', reminderRoute);

app.get('/', (req, res) => {
    res.json('hello');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  })