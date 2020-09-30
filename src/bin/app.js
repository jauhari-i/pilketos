require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const log = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(log('dev'));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log('Failed to connect database');
    }
    console.log('Connected to database');
  }
);

app.get('/', (req, res) => res.redirect('/api'));
app.use('/api', require('../routes/api'));
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({
    message: req.method + ' ' + req.url + ' not found',
    error: 'NoEndpointExist',
    code: 404,
  });
  next();
});

io.use(async (socket, next) => {
  let userSocket = socket.id;
  console.log(userSocket);
  next();
});

io.on('connection', (socket) => {
  console.log('Socket established with id: ' + socket.id);
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
