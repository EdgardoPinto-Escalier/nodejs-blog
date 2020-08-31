const express = require('express');
const morgan = require('morgan');

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Listen for requests
app.listen(3000);

// Middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

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

