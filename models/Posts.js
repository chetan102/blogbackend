const mongoose = require('mongoose');
const  shortid = require('shortid');

const postSchema = new mongoose.Schema({
    _id : { type : String, default : shortid.generate()},
    email: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    views: { type:Number ,required : true},
    comments: [{
      username: { type: String, required: true },
      value: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }],
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = new mongoose.model('Post',postSchema);
