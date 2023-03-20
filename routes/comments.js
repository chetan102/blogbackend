const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

const addComments = router.post("/", async (req, res) => {
  const { username, comment,postId } = req.body;

  try {
    if (comment) {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send("Post not found");
      }

      post.comments.push({
        username:username,
        value:comment,
      });

      await post.save();

      res.send("Comment added successfully");
    } else res.status(404).send("Error");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = addComments
