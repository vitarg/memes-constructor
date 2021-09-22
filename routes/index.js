const { Router } = require("express");

const router = Router();

router.use(require("./memes.route"));
router.use(require("./templates.route"));

module.exports = router;
