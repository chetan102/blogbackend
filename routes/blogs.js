const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
const User = require("../models/User")
const Shared = require("../shared");
const BlogFunction = new Shared();

const addBlogs = router.post("/", async (req, res) => {
  const { email, title, content } = req.body;

  try {
    if (User.findOne({ email }) && title && content ) {
      const post = new Post({
        email: email,
        title:title,
        content: content,
        category: '',
        views: 0,
        comments: [],
      });
      await post.save();
      res.send("blogAdded",)
    } else res.status(404).send("Error");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});


const getBlogs = router.get('/', async (req,res) => {
    try {
      const posts = await Post.find();
      const newArr = BlogFunction.filteredPosts(posts)
      res.send(newArr);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

const editBlog = router.post("/", async (req,res)=>{
    const { email,id,data} = req.body;
    try{
      if(User.findOne(email) && id){
        const post = await Post.findById(id);
        if(post){
            if(data.title) post.title = data.title;
            if(data.content) post.content = data.contnet;
            await post.save();
            res.send("post Updated successfully");
        }
        else{
            res.status(404),send("Error");
        }
      }
      else{
        res.status(404),send("Error to find email or id");
      }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
})
module.exports = {addBlogs,getBlogs,editBlog}