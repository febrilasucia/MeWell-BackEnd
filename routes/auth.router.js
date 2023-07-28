const express = require("express");
const {
  register,
  Login,
  verify,
  resendVerification,
} = require("../controllers/auth.controller");
const upload = require("../middleware/multerConfig");

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "ktp", maxCount: 1 },
    { name: "ijazah", maxCount: 1 },
  ]),
  register
);
router.post("/login", Login);
router.get("/verify/:id", verify);
router.post("/resendverify", resendVerification);

module.exports = router;
