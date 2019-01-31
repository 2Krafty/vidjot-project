let express = require('express');

let exphbs = require('express-handlebars');

let app = express();



//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// How middleware works
/*app.use((req, res, next) => {
  //console.log(Date.now());
  req.name = 'Christopher Kraft';
  next();
});*/

// index route
app.get('/', (req, res) => {
  let title = 'Welcome1';
  res.render('index', {
    title: title
  });
});

// about route
app.get('/about', (req, res) => {
  res.render('about');
});
let port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})