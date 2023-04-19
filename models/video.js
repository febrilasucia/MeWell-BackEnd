const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
  videoId: {
    type: String,
    require: true,
  },
  judul: {
    type: String,
    require: true,
  },
  deskripsi: {
    type: String,
    require: true,
  },
  tanggalUpload: {
    type: Date,
    default: Date.now(),
  },

  comment: [
    {
      commentContent: {
        type: String,
      },
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      dateCreated: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  // comment: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Comment",
  //   },
  // ],
});

// const commentSchema = new Schema({
//   commentContent: {
//     type: String,
//   },
//   postedBy: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now(),
//   },
// });

const Video = mongoose.model('Video', videoSchema);
// const Comment = mongoose.model("Comment", commentSchema);

module.exports = Video;
// module.exports = Comment;
