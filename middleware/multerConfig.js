const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Tentukan direktori penyimpanan gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Tentukan nama file gambar
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
