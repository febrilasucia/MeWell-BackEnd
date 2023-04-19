const express = require('express');
const { Login, Register, Logout, Me } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.post('/me', Me);

module.exports = router;
