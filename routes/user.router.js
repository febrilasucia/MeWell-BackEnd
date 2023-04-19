const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  updateProfilePicture,
} = require('../controllers/user.controller');
const { verifyToken, adminOnly } = require('../middleware/authUser');

router.get('/', verifyToken, adminOnly, getUsers);
router.get('/:id', verifyToken, adminOnly, getUserById);
router.post('/', verifyToken, adminOnly, addUser);
router.patch('/updateprofilepicture', verifyToken, updateProfilePicture);
router.patch('/:id', verifyToken, adminOnly, updateUser);
router.delete('/:id', verifyToken, adminOnly, deleteUser);

module.exports = router;
