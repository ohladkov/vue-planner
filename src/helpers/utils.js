export const getScrollBarWidth = () => window.innerWidth - document.documentElement.clientWidth;

export const setScrollBarWidth = () => {
  const root = document.documentElement;
  root.style.setProperty('--scrollBarWidth', getScrollBarWidth());
};

export const convertToDoubleDigit = (num) => `0${num}`.slice(-2);

export const isEmptyObject = (obj) => obj && (Object.keys(obj).length === 0 && obj.constructor === Object);
