const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: [true, 'Role is required'],
  },
  profileUrl: {
    type: String,
    default: function () {
      const req = this instanceof mongoose.Document ? this.$__.req : undefined;
      if (req) {
        return `${req.protocol}://${req.get('host')}/images/default.jpg`;
      }
      return undefined;
    },
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
  },
  hobbies: {
    type: String,
  },
});

const User = model('User', userSchema);

module.exports = User;
