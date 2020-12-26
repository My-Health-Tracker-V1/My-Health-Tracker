require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');

require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/food-health', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const MongoStore = require('connect-mongo')(session);

const app = express();

//Create user session that lasts 24 hours
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      // when the session cookie has an expiration date
      // connect-mongo will use it, otherwise it will create a new 
      // one and use ttl - time to live - in that case one day
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000
    })
  })
)

app.use(passport.initialize());
app.use(passport.session());


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'My Food Tracking App';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
 
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// const index = require('./routes/index');
// app.use('/api', index);

//Example taken from example code
// const projects = require('./routes/projects');
// app.use('/api/projects', projects);

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const users = require('./routes/users');
app.use('/api/users', users)

const days = require('./routes/days');
app.use('/api/days', days)

const ingredients = require('./routes/ingredients');
app.use('/api/ingredients', ingredients)

const energy = require('./routes/energy');
app.use('/api/energy', energy)

const exercise = require('./routes/exercise');
app.use('/api/exercise', exercise)

const sleep = require('./routes/sleep');
app.use('/api/sleep', sleep)

const symptoms = require('./routes/symptoms');
app.use('/api/symptoms', symptoms)

app.use((req, res) => {  
  // If no routes match, send them the React HTML.  
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
