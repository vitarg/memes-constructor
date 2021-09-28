const { Router } = require("express");

const router = Router();

router.post("/favourites");
router.delete("/favourites/:id");
router.get("/favourites/");
