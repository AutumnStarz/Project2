const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const path = require('path');
console.log('Resolved views path:', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();
const redisClient = createClient({ url: process.env.REDISCLOUD_URL });
redisClient.connect().catch(console.error);

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main', 
  }));  
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
console.log("Looking for views in:", path.join(__dirname, 'views'));

app.use('/hosted', express.static(path.join(__dirname, '..', 'hosted')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'super-secret-bot-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, 
}));

app.get('/', (req, res) => {
    res.render('home');
  });  

module.exports = app;
