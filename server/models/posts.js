const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  authorName : {
    required :true,
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required : true
  },
  createdAt: {
    required: true,
    type: String,
  },
},
{timestamps : true}
);

module.exports = mongoose.model("Posts", postSchema);
