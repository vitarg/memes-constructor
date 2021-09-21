const Template = require("../models/Template.model");

module.exports.templatesController = {
  addTemplate: async (req, res) => {
    try {
      const { img, tags, user } = req.body;

      await Template.create({
        img,
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
      const meme = await Template.findById(req.params.id);
      res.json(meme);
    } catch (e) {
      res.status(401).json({ error: e.toString() });
    }
  },
};
