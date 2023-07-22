const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const configAuth = require("../config/ConfigAuth.js");
const ConfigAuth = require("../config/ConfigAuth.js");
const {
  sendVerificationEmail,
} = require("../middleware/sendVerifycationEmail");
const { decryptID } = require("../helpers/encryptedID");

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
    } = req.body;

    // Check if password and confirm password match
    if (password !== confPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    // Hash password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    password = hash;

    // Create new user
    const role = "user";
    const profileUrl = `${req.protocol}://${req.get(
      "host"
    )}/images/default.jpg`;
    const user = new User({
      name,
      email,
      password,
      role,
      profileUrl,
      dateOfBirth,
      gender,
      age,
      work,
    });

    try {
      // Save user to the database
      const insertedUser = await user.save();
      // Assume sendVerificationEmail function is defined and works correctly
      await sendVerificationEmail(email, insertedUser._id);
      res
        .status(201)
        .json({ message: "Registration is successful, please verify email" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Email already registered" });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },

  Login2: async (req, res) => {
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
        { id: user._id, name: user.name, email: user.email, role: user.role, dateOfBirth: user.dateOfBirth, gender: user.gender, age: user.age, work: user.work, isVerified: user.isVerified },
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
  Login: async (req, res) => {
    // get body
    const { email, password } = req.body;
    try {
      // findone
      const userData = await User.findOne({ email }).exec();
      // if not found
      if (userData === null) {
        res.status(404).json({ message: "User tidak ditemukan" });
        // handle error code ERR_HTTP_HEADERS_SENT
        return;
      }
      // compare password
      const match = bcrypt.compareSync(password, userData.password); // true
      if (!match) return res.status(400).json({ message: "Wrong Password" });
      // create token
      const token = jwt.sign(
        {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        },
        ConfigAuth.jwt_secret
      );
      // success login
      if (userData) {
        res.json({
          message: "success login",
          token,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
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
  Logout: async (req, res) => {
    localStorage.removeItem("token");
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ message: "Tidak dapat logout" });
      res.status(200).json({ message: "Anda telah logout" });
    });
  },

  Me: async (req, res) => {
    const { token } = req.body;
    try {
      let { id, name, email, role } = jwt.verify(token, ConfigAuth.jwt_secret);
      let user = await User.findById({ _id: id });
      res.status(200).json({ id, name, email, role, photo: user.profile_url });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
