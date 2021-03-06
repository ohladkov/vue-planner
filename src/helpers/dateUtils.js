import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const dateToISOString = (date) => moment(date, DATE_FORMAT).toISOString();

export const formatDate = (date, format = DATE_FORMAT) => moment(dateToISOString(date)).format(format);

export const getCurrentDate = () => moment().format(DATE_FORMAT);

export const getDaysInMonth = (date) => moment(dateToISOString(date)).daysInMonth();

export const getDaysOffset = (date) =>
  moment(dateToISOString(date)).day() === 0 ? 5 : moment(dateToISOString(date)).day() - 2;

export const formatDateToString = (date, time) => {
  if (!time) {
    return moment(date).format('ddd, D MMM, YYYY');
  }

  const fullDate = `${date} ${time}`;

  return moment(new Date(fullDate)).format('ddd, D MMM, YYYY - HH:mm');
};

export const isBefore = (date1, date2) => moment(dateToISOString(date1)).isBefore(dateToISOString(date2));

export const sortEventsByMonth = (events) => {
  if (!events) return {};

  const eventsEntries = Object.entries(events);
  const monthEvents = {};

  eventsEntries.forEach((entry) => {
    const [entryDate] = entry;
    const month = moment(entryDate).format('M');

    if (!monthEvents[month]) {
      monthEvents[month] = [];
    }

    monthEvents[month].push(entry);
  });

  return monthEvents;
};

export const getDayName = (date) =>
  moment(date)
    .format('dddd')
    .toLowerCase();

export const createTimesList = (startTime, endTime, interval = 30) => {
  const times = [{ text: startTime, value: startTime }];

  while (moment(startTime, 'HH:mm').isBefore(moment(endTime, 'HH:mm'))) {
    const updatedTime = moment(startTime, 'HH:mm')
      .add(interval, 'minutes')
      .format('HH:mm');

    startTime = updatedTime;
    times.push({ text: startTime, value: startTime });
  }

  return times;
};
