const { v4: uuidv4 } = require("uuid");
const path = require("path");
const base64ToImage = require("base64-to-image");
const Meme = require("../models/Meme.model");

module.exports.memesController = {
  getAllMemes: async (req, res) => {
    try {
      const { sort } = req.query;
      let allMemes;
      switch (sort) {
        case "popular":
          allMemes = await Meme.find();
          allMemes = allMemes.sort((a, b) => b.likes.length - a.likes.length);
          break;
        case "new":
          allMemes = await Meme.find().sort("-createdAt");
          break;
        default:
          allMemes = await Meme.find();
      }
      res.json(allMemes);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  addMeme: async (req, res) => {
    try {
      const payload = req.user;
      const { file, template } = await req.body;

      const fileName = `${uuidv4()}`;
      console.log(fileName, 'файлнейм')
      const base64Str = file;
      const pathForMeme = path.resolve(__dirname, "../public/img", fileName);
      const optionalObj = { fileName: 'da', type: "jpeg" };
      console.log(optionalObj, 'объект')
      base64ToImage(base64Str, pathForMeme, optionalObj);

      let tagsAuto = "";

      if (template.tags !== undefined) {
        tagsAuto = template.tags.concat(template.tags);
      } else {
        tagsAuto = template.tags;
      }

      const meme = await Meme.create({
        img: `img/${fileName}da.jpeg`,
        author: payload.id,
        likes: [],
        tags: tagsAuto,
        templateId: template.id,
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
  randomMeme: async (req, res) => {
    try {
      const data = await Meme.find();
      const rnd = data[Math.floor(Math.random() * data.length)];
      res.json(rnd);
    } catch (e) {
      res.json(e);
    }
  },
};
