const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

let app = express();

//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//passport config
require('./config/passport')('passport');

// map global
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', { useNewUrlParser: true } )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(methodOverride('_method'));
// How middleware works
/*app.use((req, res, next) => {
  //console.log(Date.now());
  req.name = 'Christopher Kraft';
  next();
});*/

// express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

}));

app.use(flash());

//global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// index route
app.get('/', (req, res) => {

  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// about route
app.get('/about', (req, res) => {
  res.render('about');
});

//use routes
app.use('/ideas', ideas);
app.use('/users', users);

let port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})