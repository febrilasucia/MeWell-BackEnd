module.exports = {
  checkKepribadian: async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
};
