const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  Register: async (req, res) => {
    // get body
    let { name, email, password, confPassword } = req.body;
    // if password not match
    if (password !== confPassword)
      return res
        .status(400)
        .json({ message: 'Password dan Confirm Password tidak cocok' });
    // hash pass
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    password = hash;
    // create new user
    const role = 'user';
    const profile_url = `${req.protocol}://${req.get(
      'host'
    )}/images/default.jpg`;
    const user = new User({ name, email, password, role, profile_url });
    // save & res
    try {
      const inserteduser = await user.save();
      res.status(201).json(inserteduser);
    } catch (error) {
      if (error.code == 11000) {
        res.status(400).json({
          message: 'Email telah terdaftar',
        });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  Login: async (req, res) => {
    try {
      // get body
      const { email, password } = req.body;
      // findone
      const userData = await User.findOne({ email }).exec();
      // if not found
      if (userData === null) {
        res.status(404).json({ message: 'User tidak ditemukan' });
        // handle error code ERR_HTTP_HEADERS_SENT
        return;
      }
      // compare password
      const match = bcrypt.compareSync(password, userData.password); // true
      if (!match) return res.status(400).json({ message: 'Wrong Password' });
      // create token
      const token = jwt.sign(
        {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        },
        process.env.SECRET_KEY
      );
      // success login
      if (userData) {
        res.json({
          message: 'success login',
          token,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  Logout: async (req, res) => {
    localStorage.removeItem('token')
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: 'Tidak dapat logout' });
      res.status(200).json({ msg: 'Anda telah logout' });
    });
  },

  Me: async (req, res) => {
    const { token } = req.body;
    try {
      let { id, name, email, role } = jwt.verify(token, process.env.SECRET_KEY);
      let user = await User.findById({ _id: id });
      res.status(200).json({ id, name, email, role, photo: user.profile_url });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
