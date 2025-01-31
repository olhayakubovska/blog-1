import { ACTION_TYPE } from "./action-type";

export const addCommentAction = (comment) => ({
  type: ACTION_TYPE.ADD_COMMENT,
  payload: comment,
});
