const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  verifyToken: (req, res, next) => {
    // get token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    // cek token lagi
    if (!token) {
      return res.status(401).json({ msg: 'Mohon login ke akun anda!' });
    }
    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.sendStatus(403);
      next();
    });
  },
  adminOnly: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded.id,
    });
    if (!user)
      return res
        .status(404)
        .json({ message: 'User tidak ditemukan, silakan login sebagai admin' });
    if (user.role != 'admin')
      return res.status(403).json({ message: 'Akses terlarang' });
    next();
  },
};
