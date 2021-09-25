const { Router } = require("express");
const { memesController } = require("../controllers/memes.controller");

const router = Router();

router.get("/memes", memesController.getAllMemes);
router.get("/memes/:id", memesController.getByAuthor);
router.post("/memes/:templateId", memesController.addMeme);
router.delete("/memes/:memeId", memesController.removeMeme);

module.exports = router;
