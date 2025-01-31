import { request } from "../utils";
import { addCommentAction } from "./add-comment";
import { setPostData } from "./set-post-data";

export const addCommentAsync = (postId, content) => (dispatch) => {
  request(`/posts/${postId}/comments`, "POST", { content: content }).then(
    (postData) => {
      dispatch(addCommentAction(postData.data));
    }
  );
};
