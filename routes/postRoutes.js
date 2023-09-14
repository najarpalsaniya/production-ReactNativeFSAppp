const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPostController, getUserPostsController, deletePostController, updatePostController } = require('../controllers/postController');

// Route Object

const router = express.Router()

// Create Post
router.post('/create-post', requireSignIn, createPostController)

// Get All Post

router.get('/get-all-post', getAllPostController)

// Get User Post

router.get('/get-user-post', requireSignIn, getUserPostsController)

// Delete Post

router.delete('/delete-post/:id', requireSignIn, deletePostController)

// Update Post

router.put('/update-post/:id', requireSignIn, updatePostController)

// Export

module.exports = router;