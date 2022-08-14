const express = require('express');
const blogController = require('../controller/blogController')

const router = express.Router();

//home page index.
router.get('/', blogController.blog_index) 

//to get data
router.get('/create', blogController.blog_create_get)

//to extract id and show details of that id.
router.get('/:id', blogController.blog_details)

//to post data to database using post request.
router.post('/', blogController.blog_create_post)

//to delete the blog
router.delete('/:id', blogController.blog_delete)  

module.exports = router;