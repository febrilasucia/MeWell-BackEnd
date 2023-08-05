const { default: mongoose } = require("mongoose");
const Konsul = require("../models/konsul");
const Payment = require("../models/payments");

module.exports = {
  getAllKonsul: async (req, res) => {
    try {
      let query = {}; // Default query to fetch all Konsul data
      const { userId = false } = req.query;

      if (userId) {
        // If userId is provided in the query, fetch Konsul data for that specific user
        query = { user_id: mongoose.Types.ObjectId(userId) };
      }

      let konsul = await Konsul.find(query, "-__v")
        .populate("user_id", "-_id -email -password -role -isVerified -__v")
        .exec();

      res.json({
        konsul,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getKonsulById: async (req, res) => {
    try {
      const { id } = req.params;
      const konsul = await Konsul.findById(id, "-__v").populate("psikologId", "-__v -password");

      res.status(200).json({
        message: "Sukses mendapatkan data konsul",
        data: konsul,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getKonsulByPaymentStatus: async (req, res) => {
    try {
      const idPsikolog = req.user._id;

      // Gunakan agregasi untuk mencari konsultasi dengan status "Pembayaran Diterima" dan sesuai psikologId
      const konsultasiDiterima = await Konsul.aggregate([
        {
          $match: {
            psikologId: mongoose.Types.ObjectId(idPsikolog),
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "_id",
            foreignField: "idKonsultasi",
            as: "payment",
          },
        },
        {
          $unwind: "$payment",
        },
        {
          $match: {
            "payment.status": "Pembayaran Diterima",
          },
        },
        {
          $lookup: {
            from: "users", // Use the appropriate collection name for the "User" model.
            localField: "psikologId",
            foreignField: "_id",
            as: "psikolog",
          },
        },
        {
          $unwind: "$psikolog",
        },
        {
          $project: {
            _id: 1,
            via_konsul: 1,
            riwayat: 1,
            keluhan: 1,
            psikolog: {
              nama: "$psikolog.name", // Include only the "nama" field for the psikolog
            },
            createdAt: 1,
            updatedAt: 1,
            user_id: 1,
          },
        },
      ]);

      res.status(200).json({
        message: "Sukses mendapatkan data konsultasi dengan pembayaran diterima",
        data: konsultasiDiterima,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil data konsultasi" });
    }
  },

  addKonsul: async (req, res) => {
    const {
      nama_pasien,
      nama_ortu,
      tempat_lahir,
      tgl_lahir,
      gender,
      no_wa,
      alamat,
      kategori_pasien,
      via_konsul,
      riwayat,
      keluhan,
    } = req.body;
    const userId = req.user._id;

    const konsul = new Konsul({
      nama_pasien,
      nama_ortu,
      tempat_lahir,
      tgl_lahir,
      gender,
      no_wa,
      alamat,
      kategori_pasien,
      via_konsul,
      riwayat,
      keluhan,
      createdBy: userId,
    });

    const data = await konsul.save();
    console.log(data);

    res.status(200).json({
      message: "Konsultasi baru berhasil ditambahkan!",
      data: { id: data._id },
    });
  },

  updateKonsulById: async (req, res) => {
    const {
      nama_pasien,
      nama_ortu,
      tempat_lahir,
      tgl_lahir,
      gender,
      no_wa,
      alamat,
      kategori_pasien,
      via_konsul,
      riwayat,
      keluhan,
      psikologId,
    } = req.body;

    const konsulId = req.params.id;
    const updatedBy = req.user._id;

    console.log(konsulId);

    const updatedKonsul = {
      nama_pasien,
      nama_ortu,
      tempat_lahir,
      tgl_lahir,
      gender,
      no_wa,
      alamat,
      kategori_pasien,
      via_konsul,
      riwayat,
      keluhan,
      psikologId,
    };

    try {
      const konsul = await Konsul.findById(konsulId);
      if (!konsul) {
        return res.status(404).json({ message: "Data Konsultasi tidak ditemukan." });
      }

      await Konsul.findByIdAndUpdate(konsulId, updatedKonsul);

      res.status(200).json({ message: "Consultation updated successfull" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating consultation.",
        error: error.message,
      });
    }
  },

  deleteKonsulById: async (req, res) => {
    const { id } = req.params;
    const konsul = await Konsul.findById(id);

    await konsul.remove();

    res.json({
      message: "Data yang dipilih berhasil dihapus!",
      data: "terhapus",
    });
  },
};
