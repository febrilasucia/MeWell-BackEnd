require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const configAuth = require("../config/ConfigAuth.js");
const {
  sendVerificationEmail,
} = require("../middleware/sendVerifycationEmail");
const { decryptID } = require("../helpers/encryptedID");

// Fungsi untuk menghapus file
function deleteFilesIfExists(files) {
  files.forEach((file) => {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }
  });
}

module.exports = {
  register: async (req, res) => {
    // Get body data
    let {
      name,
      email,
      password,
      confPassword,
      dateOfBirth,
      gender,
      age,
      work,
      role,
      isPsikolog,
      pendidikan,
      univ,
      alasan,
    } = req.body;

    const profileFile =
      req.files && req.files.profile ? req.files.profile[0] : null;
    const ktpFile = req.files && req.files.ktp ? req.files.ktp[0] : null;
    const ijazahFile =
      req.files && req.files.ijazah ? req.files.ijazah[0] : null;

    const MAX_PROFILE_FILE_SIZE = 5000000; // Maksimal 5MB (dalam byte)
    const MAX_KTP_FILE_SIZE = 5000000; // Maksimal 5MB (dalam byte)
    const MAX_IJAZAH_FILE_SIZE = 10000000; // Maksimal 10MB (dalam byte)
    // Validasi ukuran berkas KTP
    if (profileFile && profileFile.size > MAX_PROFILE_FILE_SIZE) {
      // Delete the uploaded image if there is an error
      deleteFilesIfExists([ktpFile, ijazahFile, profileFile]);
      return res
        .status(400)
        .json({ message: "KTP file size exceeds the limit (5MB)" });
    }
    if (ktpFile && ktpFile.size > MAX_KTP_FILE_SIZE) {
      // Delete the uploaded image if there is an error
      deleteFilesIfExists([ktpFile, ijazahFile, profileFile]);
      return res
        .status(400)
        .json({ message: "KTP file size exceeds the limit (5MB)" });
    }
    // Validasi ukuran berkas Ijazah
    if (ijazahFile && ijazahFile.size > MAX_IJAZAH_FILE_SIZE) {
      // Delete the uploaded image if there is an error
      deleteFilesIfExists([ktpFile, ijazahFile, profileFile]);
      return res
        .status(400)
        .json({ message: "Ijazah file size exceeds the limit (10MB)" });
    }

    // Check if password and confirm password match
    if (password !== confPassword) {
      // Delete the uploaded image if there is an error
      deleteFilesIfExists([ktpFile, ijazahFile, profileFile]);
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    // Hash password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    password = hash;

    let profileUrl = null; // Initialize profileUrl as null

    if (profileFile) {
      // If profileFile exists, set profileUrl accordingly
      profileUrl = `/profiles/${profileFile.filename}`;
    } else if (role === "user") {
      // If role is user and profileFile doesn't exist, set default profileUrl for user
      profileUrl = "profile/default-user.jpg";
    } else if (role === "psikolog") {
      // If role is psikolog and profileFile doesn't exist, set default profileUrl for psikolog
      profileUrl = "profile/default-psikolog.jpg";
    }

    let ktpUrl = null;
    if (ktpFile) {
      ktpUrl = `/ktp/${ktpFile.filename}`;
    }
    let ijazahUrl = null;
    if (ijazahFile) {
      ijazahUrl = `/ijazah/${ijazahFile.filename}`;
    }

    try {
      // Create new user
      const user = new User({
        name,
        email,
        password,
        dateOfBirth,
        gender,
        age,
        work,
        profileUrl,
        role,
        isPsikolog, // Add the additional fields for psikolog
        pendidikan,
        univ,
        ...(ktpUrl !== null && { ktpUrl }), // Tambahkan ktpUrl jika nilainya bukan null
        ...(ijazahUrl !== null && { ijazahUrl }), // Tambahkan ijazahUrl jika nilainya bukan null
        alasan,
      });
      // Save user to the database
      const insertedUser = await user.save();
      // Assume sendVerificationEmail function is defined and works correctly
      await sendVerificationEmail(email, insertedUser._id);
      res
        .status(201)
        .json({ message: "Registration is successful, please verify email" });
    } catch (error) {
      // Delete the uploaded image if there is an error
      deleteFilesIfExists([ktpFile, ijazahFile, profileFile]);
      if (error.code === 11000) {
        res.status(400).json({ message: "Email already registered" });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },

  Login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email is not registered" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Password is not correct" });
      }

      if (!user.isVerified) {
        return res.status(403).json({
          message: "Email is not verified, please verify it before logging in",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          age: user.age,
          work: user.work,
          isVerified: user.isVerified,
        },
        configAuth.jwt_secret,
        { expiresIn: "1d" }
      );

      res.json({ message: "Logged in successfully", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An internal server error occurred",
        message: err.message,
      });
    }
  },
  verify: async (req, res) => {
    const { id } = req.params;

    try {
      const id2 = decryptID(id);
      const user = await User.findById(id2);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isVerified = true;
      await user.save();

      res.json({ message: "Email verified successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An internal server error occurred" });
    }
  },
  resendVerification: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await sendVerificationEmail(email, user.id);

      res.json({ message: "Verification email has been resent" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An internal server error occurred" });
    }
  },
};
