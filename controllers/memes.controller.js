const Meme = require("../models/Meme.model");
const Template = require("../models/Template.model");

module.exports.memesController = {
  getAllMemes: async (req, res) => {
    try {
      const { sort, page = 1, limit = 3 } = req.query;
      let allMemes;
      switch ((sort, page)) {
        case "popular":
          allMemes = allMemes
            .sort((a, b) => b.likes.length - a.likes.length)
            .limit(limit * 1)
            .skip((page - 1) * limit);
          break;
        case "new":
          allMemes = await Meme.find({})
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
          break;
        default:
          allMemes = await Meme.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);
          break;
      }
      res.json(allMemes);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  addMeme: async (req, res) => {
    try {
      const payload = req.user;
      const template = await Template.findById(req.params.templateId);

      const { tags } = await req.body;

      let tagsAuto = "";
      if (tags !== undefined) {
        tagsAuto = template.tags.concat(tags);
      } else {
        tagsAuto = template.tags;
      }

      const meme = await Meme.create({
        img: template.img,
        author: payload.id,
        likes: [],
        tags: tagsAuto,
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
  getByAuthor: async (req, res) => {
    try {
      const data = await Meme.find({ author: req.params.id });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  patchMeme: async (req, res) => {
    try {
      const candidate = await Meme.findOne({
        $and: [{ _id: req.params.id }, { likes: req.user.id }],
      });
      if (candidate) {
        await Meme.findByIdAndUpdate(req.params.id, {
          $pull: { likes: req.user.id },
        });
        return res.status(200).json({ status: false, memeId: req.params.id });
      } else {
        await Meme.findByIdAndUpdate(req.params.id, {
          $push: { likes: req.user.id },
        });
        return res.status(200).json({ status: true, memeId: req.params.id });
      }
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
};
