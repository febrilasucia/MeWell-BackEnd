const mongoose = require("mongoose");
const { Schema } = mongoose;


const paymentSchema = new Schema({
  idKonsultasi: {
    type: Schema.Types.ObjectId,
    ref: "Konsul",
    require: true,
  },
  status: {
    type: String,
    enum: ["Pembayaran Sukses", "Pembayaran Diterima", "Pembayaran Ditolak"],
    require: true,
  },
  buktiPembayaran: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
