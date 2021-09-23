const Meme = require("../models/Meme.model");
const Template = require("../models/Template.model");

module.exports.memesController = {
  getAllMemes: async (req, res) => {
    try {
      const { sort } = req.query;
      let allMemes;
      switch (sort) {
        case "popular":
          allMemes = await Meme.find({});
          allMemes = allMemes.sort((a, b) => b.likes.length - a.likes.length);
          break;
        case "new":
          allMemes = await Meme.find({}).sort({ createdAt: -1 });
          break;
        default:
          allMemes = await Meme.find({});
          break;
      }

      res.json(allMemes);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  addMeme: async (req, res) => {
    try {
      const template = await Template.findById(req.params.templateId);
      const { tag } = req.body;

      const meme = await Meme.create({
        img: template.img,
        author: req.body.author, // возьмем из токена
        likes: [],
        tags: template.tags.concat(tag),
        templateId: template._id,
      });
      res.json(meme);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  removeMeme: async (req, res) => {
    try {
      await Meme.findByIdAndRemove(req.params.memeId);
      res.json("Мем удален");
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
};
