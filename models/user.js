const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: [true, 'role is required'],
  },
  profile_url: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
