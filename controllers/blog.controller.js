const Blog = require('../models/blogs');
const User = require('../models/user');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

module.exports = {
  getAllBlog: async (req, res) => {
    let { title = false } = req.query;
    console.log(req.user);
    try {
      // execute query with page, limit, and filter values
      let blog = await Blog.find({}, '-__v')
        .populate(
          'createdBy',
          '-__v -email, -password, -dateOfBirth, -gender, -age, -work, -hobbies'
        )
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

  createBlog: async (req, res) => {
    const { title, author, content } = req.body;
    const createdBy = req.user._id;

    // Mengubah tag <img> dengan atribut src Base64 menjadi tautan gambar yang valid
    const $ = cheerio.load(content);
    $('img').each((index, element) => {
      const base64Data = $(element).attr('src').split(';base64,').pop();
      const imageExtension = $(element).attr('src').split('/')[1].split(';')[0];
      const imageFileName = `image_${Date.now()}.${imageExtension}`;
      const imagePath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        imageFileName
      );

      // Menyimpan gambar ke server
      fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });

      // Mengubah atribut src menjadi tautan gambar yang valid
      $(element).attr('src', `/images/${imageFileName}`);
    });

    const newBlog = new Blog({ title, author, content: $.html(), createdBy });

    try {
      const savedBlog = await newBlog.save();
      res.status(200).json(savedBlog);
    } catch (error) {
      res.status(404).json({
        message: 'Error',
        error: error.message,
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
