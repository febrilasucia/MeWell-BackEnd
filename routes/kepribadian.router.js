const express = require('express');
const router = express.Router();

const { checkKepribadian } = require('../controllers/introvertExtrovert.controller');

router.post('/', checkKepribadian);

module.exports = router;
