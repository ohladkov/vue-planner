export const getScrollBarWidth = () => window.innerWidth - document.documentElement.clientWidth;

export const setScrollBarWidth = () => {
  const root = document.documentElement;
  root.style.setProperty('--scrollBarWidth', getScrollBarWidth());
};

export const sortEventsByMonth = (events) => {
  const eventsEntries = Object.entries(events);
  const monthEvents = {};

  eventsEntries.forEach((entry) => {
    const [entryDate] = entry;
    const month = new Date(entryDate).getMonth() + 1;

    if (!monthEvents[month]) {
      monthEvents[month] = [];
    }

    monthEvents[month].push(entry);
  });

  return monthEvents;
};

export const convertToDoubleDigit = (num) => {
  return `0${num}`.slice(-2);
};
