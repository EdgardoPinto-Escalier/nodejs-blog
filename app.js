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

// Mongoose and MongoDB Routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'New Blog Post',
    snippet: 'This new post is about neural link',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ratione quibusdam autem. Reprehenderit vel doloremque eveniet. Recusandae cumque illo adipisci!'
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

// Routes
app.get('/', (req, res) => {
  const blogPosts = [
    {
      title: "Lorem ipsum dolor sit amet.",
      snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, necessitatibus.",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, necessitatibus.",
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, necessitatibus.",
    },
  ];
  res.render('index', { title: 'Home', blogPosts });
});

app.get("/about", (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app;

