const { response } = require("express");
const Video = require("../models/video");

module.exports = {
  getAllVideo: async (req, res) => {
    let { judul = false, page = 1, limit } = req.query;

    try {
      let count = await Video.countDocuments();
      if (judul) {
        count = await Video.countDocuments({
          judul: { $regex: ".*" + judul + ".*", $options: "i" },
        });
      }
      // if limit not set
      if (!limit) {
        limit = count;
      }
      // if page gt page count
      const pageCount = Math.ceil(count / limit);
      if (page > pageCount) {
        page = pageCount;
      }

      let video = await Video.find({}, "-__v")
        .populate("createdBy", "-_id -email -password -role -isVerified -__v")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      if (judul) {
        video = await Video.find({
          judul: { $regex: ".*" + judul + ".*", $options: "i" },
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
      }
      res.json({
        video,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);

      res.status(200).json({
        message: "Sukses mendapatkan data video",
        data: video,
      });
    } catch (error) {
      console.log(error);
    }
  },

  addVideo: (req, res) => {
    const { title, videoLink, description, author, content } = req.body;
    const userId = req.user.id;

    if (videoLink && !videoLink.startsWith("https://youtu.be/")) {
      res.status(400).json({ message: "Invalid YouTube video link" });
      videoLink = "Invalid YouTube video link";
    }

    const newVideoLink = videoLink.split("/").pop();
    const video = new Video({
      title,
      videoLink: newVideoLink,
      description,
      author,
      content,
      createdBy: userId,
    });

    video.save();

    res.status(200).json({
      message: "Video baru berhasil ditambahkan!",
    });
  },

  updateVideoById: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const video = await Video.findByIdAndUpdate(id, data);

    await video.save();

    res.status(200).json({
      message: "Data berhasil diupdate!",
    });

    video.save();
  },

  deleteVideoById: async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    await video.remove();

    res.json({
      message: "Data yang dipilih berhasil dihapus!",
      data: "terhapus",
    });
  },

  addComment: async (req, res) => {
    const { id } = req.params;
    const { commentContent, postedBy } = req.body;

    if (!commentContent) {
      res.status(400).json({
        message: "Comment harus diisi",
      });
      return;
    }

    const video = await Video.findByIdAndUpdate(id, {
      $push: {
        comment: {
          commentContent,
          postedBy,
        },
      },
    });

    await video.save();

    res.status(200).json({
      message: "Data berhasil diupdate!",
    });

    video.save();
  },

  getAllCommentByVideo: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(
        id,
        "-_id -link -judul -deskripsi -tanggalUpload"
      ).populate(
        "comment.postedBy",
        "-_id -email -password -role -profile_url -__v"
      );

      res.status(200).json({
        message: "Sukses mendapatkan data video",
        data: video,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    // const { commentContent, postedBy } = req.body;

    const video = await Video.findByIdAndUpdate(id, {
      $pull: {
        comment: { _id: req.params.commentID },
      },
    });

    await video.save();

    res.status(200).json({
      message: "Data berhasil diupdate!",
    });
  },
};
