const express = require('express');
const router = express.Router();

const {
  getAllVideo,
  getVideoById,
  addVideo,
  updateVideoById,
  deleteVideoById,
  getAllCommentByVideo,
  addComment,
  deleteComment,
} = require('../controllers/video.controller');
const { verifyToken, adminOnly } = require('../middleware/authUser');

router.get('/', getAllVideo);
router.get('/:id', getVideoById);
router.post('/', verifyToken, adminOnly, addVideo);
router.patch('/:id', verifyToken, adminOnly, updateVideoById);
router.delete('/:id', verifyToken, adminOnly, deleteVideoById);
router.get('/:id/comment', getAllCommentByVideo);
router.post('/:id/comment', verifyToken, addComment);
router.delete('/:id/comment/:commentID', verifyToken, adminOnly, deleteComment);

module.exports = router;
