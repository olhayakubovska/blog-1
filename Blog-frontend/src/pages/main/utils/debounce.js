export const debounce = (fn, delay) => {
  let abc;
  return (...args) => {
    clearInterval(abc);
    abc = setTimeout(() => fn(...args), delay);
  };
};
