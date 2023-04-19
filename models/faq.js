const mongoose = require('mongoose');
const { Schema } = mongoose;

const faqSchema = new Schema({
  question: {
    type: String,
    require: true,
    unique: true,
  },
  answer: {
    type: String,
    require: true,
  },
});

const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;
