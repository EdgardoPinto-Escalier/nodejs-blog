const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');

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

// Blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app;

