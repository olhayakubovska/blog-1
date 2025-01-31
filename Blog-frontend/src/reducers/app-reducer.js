import { ACTION_TYPE } from "../actions/action-type";

const initialStateApp = {
  wasLogout: false,
  modal: {
    isOpen: false,
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const appReducer = (state = initialStateApp, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };

    case ACTION_TYPE.ON_OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload,
          isOpen: true,
        },
      };

    case ACTION_TYPE.CLOSE_MODAL:
      return initialStateApp;

    default:
      return state;
  }
};
