const { Router } = require("express");
const { memesController } = require("../controllers/memes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/memes", memesController.getAllMemes);
router.get("/memes/rnd", memesController.randomMeme);
router.get("/memes/:id", memesController.getByAuthor);
router.post("/memes/", authMiddleware, memesController.addMeme);
router.delete("/memes/:memeId", memesController.removeMeme);
router.post("/memes/likes/:id", authMiddleware, memesController.patchMeme);

module.exports = router;
