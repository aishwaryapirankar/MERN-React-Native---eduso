const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content: {
    type: String,
  },
  subject: {
    type: String,
  },
  
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;