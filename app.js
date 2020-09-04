const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blog');

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog Routes

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

// GET request
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blog Posts', blogs: result })
    })
    .catch((err) => {
      console.log(err);
    })
});

// POST request
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
});

// SINGLE post request
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      console.log(err);
    });
});

// DELETE post request
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => {
      console.log(err);
    })
})





// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app;

