const jwt = require("jsonwebtoken");
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
    const { authorization } = req.headers;

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json("неверный тип токена");
    }

    try {
      const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY);
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
};
