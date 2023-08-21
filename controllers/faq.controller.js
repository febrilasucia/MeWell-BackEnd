const Faq = require("../models/faq");

module.exports = {
  getFaqs: async (req, res) => {
    // destructure page and limit and set default values
    let { page = 1, limit, question = false } = req.query;

    try {
      // get total documents in the Posts collection
      let count = await Faq.countDocuments();
      if (question) {
        count = await Faq.countDocuments({
          question: { $regex: ".*" + question + ".*", $options: "i" },
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
      // execute query with page, limit, and filter values
      let faqs = await Faq.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      if (question) {
        faqs = await Faq.find({
          question: { $regex: ".*" + question + ".*", $options: "i" },
        })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
      }
      // return response with posts, total pages, and current page
      res.json({
        faqs,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  addFaq: async (req, res) => {
    let data = req.body;
    const faq = new Faq(data);
    try {
      const insertedFaq = await faq.save();
      res.status(201).json(insertedFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateFaq: async (req, res) => {
    let data = req.body;
    try {
      const updatedFaq = await Faq.updateOne({ _id: req.params.id }, { $set: data }, { runValidators: true });
      res.status(200).json(updatedFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteFaq: async (req, res) => {
    // delete user in db
    try {
      const deleteFaq = await Faq.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: "User Deleted Successfully",
        data: deleteFaq,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
