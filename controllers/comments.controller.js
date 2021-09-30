const Comment = require("../models/Comment.model");

module.exports.commentsController = {
  createComment: async (req, res) => {
    try {
      const { text } = req.body;
      const data = await Comment.create({
        text,
        userId: req.user.id,
        memeId: req.params.id,
      });
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  },
  getComments: async (req, res) => {
    try {
      const data = await Comment.find();
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const data = await Comment.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  },
  editComment: async (req, res) => {
    try {
      const { text } = req.body;

      const data = await Comment.findByIdAndUpdate(req.params.id, {
        text,
      });
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  },
  getCommentsByMeme: async (req, res) => {
    try {
      const data = await Comment.find({ memeId: req.params.id });
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  },
};
