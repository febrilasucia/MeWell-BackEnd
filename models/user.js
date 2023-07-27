const { default: mongoose, Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "psikolog"],
    // default: "user",
    required: [true, "Role is required"],
  },
  profileUrl: {
    type: String,
    default: function () {
      const req = this instanceof mongoose.Document ? this.$__.req : undefined;
      if (req) {
        return `${req.protocol}://${req.get("host")}/images/default.jpg`;
      }
      return undefined;
    },
  },
  dateOfBirth: {
    type: Date,
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
  isVerified: {
    type: Boolean,
    default: false,
  },

  isPsikolog: {
    type: String,
    enum: ["Menunggu", "Diterima", "Ditolak"],
  },
  pendidikan: {
    type: String,
  },
  univ: {
    type: String,
  },
  ktpUrl: {
    type: String,
  },
  ijazahUrl: {
    type: String,
  },
  alasan: {
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
