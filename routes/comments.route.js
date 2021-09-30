const { Router } = require("express");

const { commentsController } = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/memes/:id", authMiddleware, commentsController.createComment);
router.get("/", authMiddleware, commentsController.getComments);
router.get("/memes/:id", authMiddleware, commentsController.getCommentsByMeme);
router.delete("/:id", authMiddleware, commentsController.deleteComment);
router.patch("/memes/:id", authMiddleware, commentsController.editComment);

module.exports = router;
