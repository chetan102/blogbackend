const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
app.use(express.json())
const router = express.Router();


// imnport all the routes 

const login = require("./routes/login");
const signup = require("./routes/signup")
const {addBlogs,getBlogs,editBlog} = require("./routes/blogs")
const comments = require("./routes/comments");
// ends importing 




// Connect to MongoDB database
mongoose.connect(
    "mongodb+srv://admin:1234@bloghouse.5ligpkj.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  // Get the default connection
  const db = mongoose.connection;
  
  // Bind connection to error event
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  
  // Bind connection to open event
  db.once("open", function () {
    console.log("MongoDB connection successful!");
});

app.listen(port,()=>{
    console.log("our port",port)
})


app.use('/signup',signup);
app.use('/login',login);
app.use('/addblog',addBlogs);
app.use("/getblogs",getBlogs);
app.use("/addcomment",comments)
app.use('/editblog',editBlog)

module.exports = {router}
  