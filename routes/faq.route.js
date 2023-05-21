const express = require('express');
const {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faq.controller');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/authUser');

router.get('/', getFaqs);
// * admin
router.post('/', verifyToken, adminOnly, addFaq);
router.patch('/:id', verifyToken, adminOnly, updateFaq);
router.delete('/:id', verifyToken, adminOnly, deleteFaq);

module.exports = router;
