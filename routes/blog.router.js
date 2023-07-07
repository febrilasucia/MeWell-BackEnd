const express = require('express');
const {
  getAllBlog,
  getBlogById,
  createBlog,

  deleteBlog,
  postComment,
  getAllBlogCommentById,
  deleteBlogCommentById,
  updateCommentById,
  updateBlog,
} = require('../controllers/blog.controller');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authUser');
const upload = require('../middleware/multerConfig');

router.get('/', getAllBlog);
router.get('/:id', getBlogById);
router.post('/', verifyToken, authorizeRoles(['admin']), createBlog);
router.patch('/:id', verifyToken, authorizeRoles(['admin']), updateBlog);
router.delete('/:id', verifyToken, authorizeRoles(['admin']), deleteBlog);
router.post('/:id/comment', verifyToken, postComment);
router.get('/:id/comment', getAllBlogCommentById);
router.delete('/:id/comment/:idComment', verifyToken, deleteBlogCommentById);
router.patch('/:id/comment/:idComment', verifyToken, updateCommentById);
module.exports = router;
