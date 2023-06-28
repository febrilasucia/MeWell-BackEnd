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
const { verifyToken, authorizeRoles } = require('../middleware/authUser');

router.get('/', verifyToken, authorizeRoles(['admin']), getUsers);
router.get('/:id', verifyToken, authorizeRoles(['admin']), getUserById);
router.post('/', verifyToken, authorizeRoles(['admin']), addUser);
router.patch('/updateprofilepicture', verifyToken, updateProfilePicture);
router.patch('/:id', verifyToken, authorizeRoles(['admin']), updateUser);
router.delete('/:id', verifyToken, authorizeRoles(['admin']), deleteUser);

module.exports = router;
