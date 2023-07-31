const Konsul = require("../models/konsul");

module.exports = {
  getAllKonsul: async (req, res) => {
    try {
      let konsul = await Konsul.find({}, "-__v")
        .populate("createdBy", "-_id -email -password -role -isVerified -__v")
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
      const konsul = await Konsul.findById(id, "-__v").populate(
        "psikologId",
        "-__v -password"
      );

      res.status(200).json({
        message: "Sukses mendapatkan data konsul",
        data: konsul,
      });
    } catch (error) {
      console.log(error);
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
    const userId = req.user.id;

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
    const updatedBy = req.user.id;

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
        return res
          .status(404)
          .json({ message: "Data Konsultasi tidak ditemukan." });
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
