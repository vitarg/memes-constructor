const jwt = require("jsonwebtoken");
const Meme = require("../models/Meme.model");
const Template = require("../models/Template.model");

module.exports.memesController = {
  getAllMemes: async (req, res) => {
    try {
      const allMemes = await Meme.find({}).populate("author");
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
};
