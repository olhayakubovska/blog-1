import { useEffect } from "react";
import { useStore } from "react-redux";

export const useResetForm = (reset) => {
  const store = useStore();
  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;

    return store.subscribe(() => {
      let previusWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== previusWasLogout) {
        reset();
      }
    });
  }, [reset, store]);
};
