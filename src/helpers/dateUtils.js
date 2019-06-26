import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const dateToISOString = (date) => moment(date, DATE_FORMAT).toISOString();

export const getDaysInMonth = (date) => moment(dateToISOString(date)).daysInMonth();

export const getDaysOffset = (date) =>
  moment(dateToISOString(date)).day() === 0 ? 5 : moment(dateToISOString(date)).day() - 2;

export const formatDateToString = (date) => moment(date).format('llll'); // TODO fix moment Deprecation warning

export const isBefore = (date1, date2) => moment(dateToISOString(date1)).isBefore(dateToISOString(date2));

export const sortEventsByMonth = (events) => {
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

export const getDayName = (date) => moment(date).format('dddd');

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
