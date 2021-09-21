const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
  img: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [{type: String}],
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template"
  }
}, {timestamps: true}
);

const Meme = mongoose.model("Meme", memeSchema);

module.exports = Meme;