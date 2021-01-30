require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
// const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

mongoose
  .connect('mongodb://localhost/activity-generator', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/order
const appName = require('./package.json').name;
// eslint-disable-next-line no-unused-vars
const debug = require('debug')(`${appName}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Session Management

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: "Darth Vader is Luke's father",
  cookie: { maxAge: 60 * 60 * 1000 * 24 }, // 1 day
  store: new MongoStore({ // this is going to create the `sessions` collection in the db
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const index = require('./routes/index');

app.use('/', index);
app.use('/api', require('./routes/activity-routes'));
app.use('/api', require('./routes/auth'));

module.exports = app;
