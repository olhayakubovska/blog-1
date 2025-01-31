import { ACTION_TYPE } from "./action-type";

export const setUser = (session) => ({
  type: ACTION_TYPE.SET_USER,
  payload: session,
});
