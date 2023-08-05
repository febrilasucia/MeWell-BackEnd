const express = require("express");
const router = express.Router();

const { verifyToken, authorizeRoles } = require("../middleware/authUser");
const { getAllPsikologRegis, getPsikologRegisterById } = require("../controllers/psikolog.controller");

router.get("/registrasi/:psikologId", getPsikologRegisterById);
router.get("/registrasi", getAllPsikologRegis);

module.exports = router;
