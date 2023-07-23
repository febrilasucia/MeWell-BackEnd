const express = require('express');
const {
  register,
  Login,
  verify,
  resendVerification,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', Login);
router.get('/verify/:id', verify);
router.post('/resendverify', resendVerification);

module.exports = router;
