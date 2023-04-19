const express = require('express');
const { 
    getAllBlog, 
    getBlogById,
    postBlog,
    updateBlogById,
    deleteBlogById,
    postComment,
    getAllBlogCommentById,
    deleteBlogCommentById,
    updateCommentById
} = require('../controllers/blog.controller');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/authUser');

router.get("/", getAllBlog)
router.get("/:id", getBlogById)
router.post("/", verifyToken, adminOnly, postBlog)
router.patch("/:id", verifyToken, adminOnly, updateBlogById)
router.delete("/:id", verifyToken, adminOnly, deleteBlogById)
router.post("/:id/comment", verifyToken, postComment)
router.get("/:id/comment", getAllBlogCommentById)
router.delete("/:id/comment/:idComment", verifyToken, deleteBlogCommentById)
router.patch("/:id/comment/:idComment", verifyToken, updateCommentById)
module.exports = router