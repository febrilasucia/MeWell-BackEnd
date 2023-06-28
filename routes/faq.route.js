const express = require('express');
const {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faq.controller');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authUser');

router.get('/', getFaqs);
// * admin
router.post('/', verifyToken, authorizeRoles(['admin']), addFaq);
router.patch('/:id', verifyToken, authorizeRoles(['admin']), updateFaq);
router.delete('/:id', verifyToken, authorizeRoles(['admin']), deleteFaq);

module.exports = router;
