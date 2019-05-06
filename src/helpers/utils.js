export const getScrollBarWidth = () => window.innerWidth - document.documentElement.clientWidth;

export const setScrollBarWidth = () => {
  const root = document.documentElement;
  root.style.setProperty('--scrollBarWidth', getScrollBarWidth());
};
