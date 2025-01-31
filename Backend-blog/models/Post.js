import mongoose from "mongoose";
import validator from "validator";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL, 
        message: "Image should be a valid URL",
      },
    },

    content: {
      type: String,
      required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
