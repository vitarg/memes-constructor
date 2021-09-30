const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  memeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meme",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
