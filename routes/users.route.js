const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", authMiddleware, usersController.getUsers);
router.post("/", usersController.postUser);
router.post("/login", usersController.login);

module.exports = router;
