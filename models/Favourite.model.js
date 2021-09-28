const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    memeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meme",
    },
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
