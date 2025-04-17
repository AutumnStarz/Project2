const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

// redis setup
const redisClient = createClient({ url: process.env.REDISCLOUD_URL });
redisClient.connect().catch(console.error);

// handlebars setup
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
console.log('Looking for views in:', path.join(__dirname, 'views'));


app.use('/hosted', express.static(path.join(__dirname, '..', 'hosted')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, 
}));



const router = require('./router');
app.use('/', router);

module.exports = app;
