// add

import Post from "../models/Post.js";

export const addPost = async (post) => {
  const newPost = await Post.create(post);
  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
};
// edit
export const editPost = async (postId, post) => {
  const editedPost = await Post.findByIdAndUpdate(postId, post, {
    returnDocument: "after",
  });

  await editedPost.populate({
    path: "comments",
    populate: "author",
  });

  return editedPost;
};

//delete
export const deletePost = (postId) => {
  return Post.deleteOne({ _id: postId });
};

//get list with serch and pagination

export const getPosts = async (search = "", limit = 6, page = 1) => {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
};

export const getPost = (postId) => {
  return Post.findById(postId).populate({
    path: "comments",
    populate: "author",
  });
};
