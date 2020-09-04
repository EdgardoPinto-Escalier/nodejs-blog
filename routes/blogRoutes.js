const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

// Blog Routes

// CREATE request for new blog posts
router.get('/create', blogController.blog_create_get);

// GET request
router.get('/', blogController.blog_index);

// POST request
router.post('/', blogController.blog_create_post);

// SINGLE post request
router.get('/:id', blogController.blog_details);

// DELETE post request
router.delete('/:id', blogController.blog_delete);

module.exports = router;
