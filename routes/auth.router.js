const express = require('express');
const { Login, register, Logout, Me } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.post('/me', Me);

module.exports = router;
