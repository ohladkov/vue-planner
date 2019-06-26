<template>
  <div class="month">
    <h2>{{ month.name }}</h2>

    <Week />

    <div class="days-list">
      <Day v-for="day in daysList" :key="day.id" :day="day" />
    </div>
  </div>
</template>

<script>
import Week from './Week';
import Day from './Day';
import { getDaysOffset, getDaysInMonth } from '../helpers/dateUtils';
import { convertToDoubleDigit } from '../helpers/utils';

export default {
  name: 'Month',
  props: {
    month: {
      type: Object,
      required: true,
    },
    events: {
      type: Array,
    },
    specialEvents: {
      type: Array,
    },
    year: {
      required: true,
    },
  },
  components: {
    Week,
    Day,
  },
  data() {
    return {
      id: null,
      name: null,
      days: {},
    };
  },
  computed: {
    daysList() {
      const { year, month, events, specialEvents } = this.$props;
      const monthId = month.id;
      const days = getDaysInMonth(`${year}-${monthId}`);
      const offsetDays = getDaysOffset(`${year}-${monthId}`);

      const daysList = [];

      for (let i = -offsetDays; i <= days; i++) {
        const day = {
          id: i,
        };

        if (i <= 0) {
          day.isEmpty = true;
          daysList.push(day);

          continue;
        }

        let eventsList = [];
        const dateFormat = `${year}-${convertToDoubleDigit(monthId)}-${convertToDoubleDigit(i)}`;
        day.date = dateFormat;

        if (events && events.length && (specialEvents && specialEvents.length)) {
          eventsList = [...events, ...specialEvents];
        } else if (events && events.length) {
          eventsList = [...events];
        } else if (specialEvents && specialEvents.length) {
          eventsList = [...specialEvents];
        }

        if (eventsList.length) {
          eventsList.forEach((entry) => {
            const [date, event] = entry;
            if (dateFormat === date) {
              day.events = event;
            }
          });
        }

        daysList.push(day);
      }

      return daysList;
    },
  },
};
</script>

<style lang="scss">
.month {
  padding: 1rem;
}

.days-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
