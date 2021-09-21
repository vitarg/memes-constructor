const { Router } = require("express");
const { templatesController } = require("../controllers/templates.controller");

const router = Router();

router.post("/templates", templatesController.addTemplate);
router.get("/templates", templatesController.getAllTemplates);
router.get("/templates/:templateId", templatesController.getTemplateById);

module.exports = router;
