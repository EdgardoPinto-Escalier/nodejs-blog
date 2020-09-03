const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blog');

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog Routes
app.get('/blogs', (req, res) => {
  Blog.find().sort()
    .then((result) => {
      res.render('index', { title: 'All Blog Posts', blogs: result })
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app;

