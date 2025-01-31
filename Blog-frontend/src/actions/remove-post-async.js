import { request } from "../utils";

export const removePostAsync = (postId) => () =>
  request(`/posts/${postId}`, "DELETE");
