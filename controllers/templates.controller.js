const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Template = require("../models/Template.model");

module.exports.templatesController = {
  addTemplate: async (req, res) => {
    try {
      const imgFile = req.files.image;
      const { tags, user } = req.body;

      const fileName = `${uuidv4()}${path.extname(imgFile.name)}`;

      await imgFile.mv(
        path.resolve(__dirname, `../public/img/${fileName}`),
        (e) => {
          if (e) throw e;
        }
      );

      await Template.create({
        img: `img/${fileName}`,
        tags,
        user,
      });

      res.json("Шаблон добавлен");
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  getAllTemplates: async (req, res) => {
    try {
      const allTemplates = await Template.find();
      res.json(allTemplates);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
  getTemplateById: async (req, res) => {
    try {
      const meme = await Template.findById(req.params.templateId);
      res.json(meme);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
};
