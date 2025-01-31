//add

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);

  await Post.findByIdAndUpdate(postId, {
    $push: { comments: newComment },
  });

  await newComment.populate("author");

  return newComment;
}

//deletes

export async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });

  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  return;
}

//get list with post
