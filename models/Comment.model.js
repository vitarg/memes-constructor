const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: String,
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
