import { ACTION_TYPE } from "./action-type";

export const removeCommentAction = (data) => ({
  type: ACTION_TYPE.REMOVE_COMMENT,
  payload: data,
});
