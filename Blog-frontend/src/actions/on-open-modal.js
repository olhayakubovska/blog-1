import { ACTION_TYPE } from "./action-type";

export const onOpenModal = (modalParams) => ({
  type: ACTION_TYPE.ON_OPEN_MODAL,
  payload: modalParams,
});
