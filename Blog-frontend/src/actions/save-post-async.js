import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const savePostAsync = (postIdForEdit, newPostData) => (dispatch) => {
  const saveRequest = postIdForEdit
    ? request(`/posts/${postIdForEdit}`, "PATCH", newPostData)
    : request("/posts", "POST", newPostData);

  return saveRequest.then((newPost) => {

    dispatch(setPostData(newPost.data));

    return newPost.data;
  });
};
