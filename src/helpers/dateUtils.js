import moment from 'moment';

export const DATE_FORMAT = 'YYYY-M-D';

export const dateToIsoString = (date) => {
  return moment(date, DATE_FORMAT).toISOString();
};

export const getCurrentDate = () => {
  const today = moment(new Date());

  const year = today.format('YYYY');
  const month = today.format('M');
  const day = today.format('D');

  return dateToIsoString(`${year}-${month}-${day}`);
};

export const setCurrentDate = () => {
  const today = moment(getCurrentDate()).format(DATE_FORMAT);

  const todayEl = document.querySelector(`[data-date="${today}"]`);
  todayEl.dataset.current = true;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDaysOffset = (date = new Date()) => {
  const day = new Date(date).getDay();
  const convertedDay = day !== 0 ? day : 7;

  return convertedDay - 2;
};
