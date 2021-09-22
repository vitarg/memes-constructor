const { Router } = require("express");

const router = Router();

router.use(require("./memes.route"));
router.use(require("./templates.route"));
router.use(require("./users.route"));

module.exports = router;
