const { Router } = require("express");

const router = Router();

router.use(require("./memes.route"));
router.use(require("./templates.route"));
router.use("/users", require("./users.route"));
router.use("/comments", require("./comments.route"));

module.exports = router;
