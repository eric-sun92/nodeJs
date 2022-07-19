const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router()

// blog routes

router.get('/', blogController.getBlog)
router.post('/', blogController.createBlog)
router.get('/create', blogController.createBlogGet)
router.delete('/:id', blogController.deleteBlog)
router.get('/:id', blogController.blogDetails)

module.exports = router