const Blog = require('../models/blogs');
const User = require('../models/user');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

// Fungsi untuk mendapatkan daftar gambar dari konten blog
const getImagesFromContent = (content) => {
  const $ = cheerio.load(content);
  const images = [];

  $('img').each((index, element) => {
    const imageSrc = $(element).attr('src');
    if (imageSrc.startsWith('/images/')) {
      images.push(imageSrc);
    }
  });

  return images;
};

// Fungsi untuk menghapus gambar dari server
const deleteImages = (images) => {
  images.forEach((image) => {
    const imagePath = path.join(__dirname, '..', 'public', image);
    if (fs.existsSync(imagePath)) {
      // Hapus gambar hanya jika file gambar masih ada
      fs.unlinkSync(imagePath);
    }
  });
};

module.exports = {
  getAllBlog: async (req, res) => {
    let { title = false } = req.query;
    try {
      // execute query with page, limit, and filter values
      let blog = await Blog.find({}, '-__v')
        .populate(
          'createdBy',
          '-__v -password -profileUrl -gender -age -work -hobbies -isVerified -dateOfBirth -role -email'
        )
        .exec();
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
    const { title, description, author, content } = req.body;
    const createdBy = req.user.id;

    // Validasi jumlah kata dalam deskripsi
    const wordCount = description.trim().split(' ').length;
    if (wordCount > 50) {
      return res
        .status(400)
        .json({ message: 'Deskripsi melebihi batas maksimum kata.' });
    }

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

    const newBlog = new Blog({
      title,
      description,
      author,
      content: $.html(),
      createdBy,
    });

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

  updateBlog: async (req, res) => {
    const { title, description, author, content } = req.body;
    const blogId = req.params.id;

    try {
      // Cek apakah blog dengan ID yang diberikan ada di database
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Validasi jumlah kata dalam deskripsi
      const wordCount = description.trim().split(' ').length;
      if (wordCount > 50) {
        return res
          .status(400)
          .json({ message: 'Deskripsi melebihi batas maksimum kata.' });
      }

      // Menghapus gambar-gambar yang tidak digunakan dalam konten blog yang baru
      const previousImages = getImagesFromContent(blog.content);
      const updatedImages = getImagesFromContent(content);
      const unusedImages = previousImages.filter(
        (image) => !updatedImages.includes(image)
      );
      deleteImages(unusedImages);

      // Mengubah tag <img> dengan atribut src Base64 menjadi tautan gambar yang valid
      const $ = cheerio.load(content);
      $('img').each((index, element) => {
        const base64Data = $(element).attr('src').split(';base64,').pop();
        const imageExtension = $(element)
          .attr('src')
          .split('/')[1]
          .split(';')[0];
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

      // Update data blog
      blog.title = title;
      blog.description = description;
      blog.author = author;
      blog.content = $.html();

      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({
        message: 'Error',
        error: error.message,
      });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;
    console.log(req.user);
    console.log(req.user);
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';

    try {
      let blog;
      if (isAdmin) {
        // Jika pengguna adalah admin, cari blog berdasarkan ID saja
        blog = await Blog.findOne({ _id: id });
      } else {
        // Jika pengguna bukan admin, cari blog berdasarkan ID dan pastikan pengguna adalah pembuat blog
        blog = await Blog.findOne({ _id: id, createdBy: userId });
      }
      if (!blog) {
        return res.status(404).json({ message: 'Blog tidak ditemukan.' });
      }

      // Hapus gambar yang terkait dengan blog jika ada
      const images = getImagesFromContent(blog.content);
      console.log(images);
      deleteImages(images);

      // Hapus blog dari database
      await Blog.deleteOne({ _id: id });

      res.status(200).json({ message: 'Blog berhasil dihapus.' });
    } catch (error) {
      res.status(500).json({
        message: 'Terjadi kesalahan saat menghapus blog.',
        error: error.message,
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
