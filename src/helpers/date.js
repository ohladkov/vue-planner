export const getCurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${year}-${month}-${day}`;
};

export const setCurrentDate = () => {
  const today = getCurrentDate();

  const todayEl = document.querySelector(`[data-date="${today}"]`);
  todayEl.dataset.current = true;
};
