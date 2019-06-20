export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getDaysOffset = (year, month) => {
  const day = new Date(year, month - 1).getDay();
  const convertedDay = day !== 0 ? day : 7;

  return convertedDay - 2;
};
