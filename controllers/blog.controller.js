const Blog = require('../models/blogs');
const User = require('../models/user');

module.exports = {
  getAllBlog: async (req, res) => {
    let { title = false } = req.query;

    try {
      // execute query with page, limit, and filter values
      let blog = await Blog.find({}, '-__v')
        .populate('createdBy', '-__v -email -password -role -_id -profile_url')
        .exec();
      if (title) {
        blog = await Blog.find({
          title: { $regex: '.*' + title + '.*', $options: 'i' },
        }).exec();
      }
      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getBlogById: async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate(
      'createdBy',
      '-__v -email -password -role -_id -profile_url'
    );
    try {
      res.status(200).json({
        message: 'success',
        data: blog,
      });
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },

  // filesatck
  postBlog: async (req, res) => {
    const data = req.body;
    const blog = await Blog(data);

    try {
      saveBlog = await Blog.create(blog);
      res.status(200).json(saveBlog);
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },

  updateBlogById: async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const update = await Blog.updateOne({ _id: id }, data);
    try {
      res.status(200).json({
        message: 'Success',
        data: update,
      });
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },

  deleteBlogById: async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      await Blog.deleteOne({ _id: id });
      res.status(200).json({
        message: 'Success',
      });
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },

  postComment: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    if (!data) {
      res.status(400).json({
        message: 'Comment harus diisi',
      });
      return;
    }

    try {
      const blog = await Blog.findByIdAndUpdate(id, {
        $push: {
          comment: data,
        },
      });
      await blog.save();
      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },
  getAllBlogCommentById: async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(
      id,
      '-image -title -subTitle -description -dateCreated -createdBy'
    ).populate(
      'comment.postedBy',
      '-_id -email -password -role -profile_url -__v'
    );
    console.log(blog);
    try {
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({
        message: 'error',
      });
    }
  },

  updateCommentById: async (req, res) => {
    const { idComment } = req.params;
    const data = req.body;
    try {
      const upComment = await Blog.findoneAndUpdate(idComment, {
        $push: {
          comment: data,
        },
      });
      await upComment.save();

      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },

  deleteBlogCommentById: async (req, res) => {
    const { id, idComment } = req.params;
    try {
      const blog = await Blog.findByIdAndUpdate(id, {
        $pull: {
          comment: { _id: idComment },
        },
      });
      await blog.save();
      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(404).json({
        message: 'error',
      });
    }
  },
};
