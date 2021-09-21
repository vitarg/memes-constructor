const { Router } = require('express');
const { memesController } = require('../controllers/memes.controller')

const router = Router();

router.get("/memes", memesController.getAllMemes);
router.post("/memes", memesController.addMeme);

module.exports = router;