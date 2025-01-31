import { request } from "../utils";
import { removeCommentAction } from "./remove-comment-actions";
import { setPostData } from "./set-post-data";

export const removeCommentAsync = (postId, commentId) => (dispatch) => {
  request(`/posts/${postId}/comments/${commentId}`, "DELETE").then(() => {
    dispatch(removeCommentAction(commentId));
  });
};
