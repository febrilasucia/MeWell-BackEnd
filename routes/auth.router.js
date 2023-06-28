const express = require('express');
const { Login, register, Logout, Me, Login2 } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', Login2);
router.delete('/logout', Logout);
router.post('/me', Me);

module.exports = router;
