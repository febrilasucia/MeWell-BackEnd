const mongoose = require("mongoose");
const { Schema } = mongoose;

const konsulSchema = new Schema({
  nama_pasien: {
    type: String,
    require: true,
  },
  nama_ortu: {
    type: String,
    require: true,
  },
  tempat_lahir: {
    type: String,
    require: true,
  },
  tgl_lahir: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
    enum: ["L", "P"],
  },
  no_wa: {
    type: String,
    require: true,
  },
  alamat: {
    type: String,
    require: true,
  },
  kategori_pasien: {
    type: String,
    require: true,
    enum: [
      "Konsultasi Anak (5-11 tahun)",
      "Konsultasi Remaja (12-25 tahun)",
      "Konsultasi Dewasa (26-45 tahun)",
    ],
  },
  via_konsul: {
    type: String,
    require: true,
    enum: ["Via Online", "Via Offline"],
  },
  riwayat: {
    type: String,
    require: true,
  },
  keluhan: {
    type: String,
    require: true,
  },
  psikologId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const Konsul = mongoose.model("Konsul", konsulSchema);
module.exports = Konsul;
