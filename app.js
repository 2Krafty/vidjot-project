const express = require('express');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

let app = express();
// map global
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb+srv://krafty:TalenJames2011@vidjot-dev-ndnxz.mongodb.net/test?retryWrites=true')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// load idea model
require('./models/Idea');
constIdea = mongoose.model('ideas');

//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// How middleware works
/*app.use((req, res, next) => {
  //console.log(Date.now());
  req.name = 'Christopher Kraft';
  next();
});*/

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
// add idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});
// process form
app.post('/ideas', (req, res) => {

  res.send('ok');
})

let port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})