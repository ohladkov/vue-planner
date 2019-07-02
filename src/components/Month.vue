<template>
  <div class="month">
    <h2>{{ month.name }}</h2>

    <Week />

    <div class="days-list">
      <Day 
        v-for="day in daysList" 
        :key="day.id" 
        :day="day" 
      />
    </div>
  </div>
</template>

<script>
import Week from './Week';
import Day from './Day';
import { getDaysOffset, getDaysInMonth, getDayName } from '../helpers/dateUtils';
import { convertToDoubleDigit, isEmptyObject } from '../helpers/utils';

export default {
  name: 'Month',
  props: {
    month: {
      type: Object,
      required: true,
    },
    schedule: {
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
    currentDate: {
      required: true,
      type: String,
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
      const { year, month, events, specialEvents, schedule, currentDate } = this.$props;
      const monthId = convertToDoubleDigit(month.id);
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

        const dateFormat = `${year}-${convertToDoubleDigit(monthId)}-${convertToDoubleDigit(i)}`;

        if (dateFormat === currentDate) {
          day.isToday = true;
        }

        const dayName = getDayName(dateFormat);
        const daySchedule = schedule[dayName];

        if (!isEmptyObject(daySchedule)) {
          day.schedule = daySchedule;
        }

        day.date = dateFormat;

        let eventsList = [];

        if (Array.isArray(events) && Array.isArray(specialEvents)) {
          eventsList = [...events, ...specialEvents];
        } else if (Array.isArray(events)) {
          eventsList = [...events];
        } else if (Array.isArray(specialEvents)) {
          eventsList = [...specialEvents];
        }

        if (eventsList.length) {
          eventsList.forEach((entry) => {
            const [date, event] = entry;

            if (dateFormat === date) {
              if (!day.events) {
                day.events = [];
              }

              day.events.push(event);
            }
          });

          if (Array.isArray(day.events)) {
            day.events = day.events.flat();
          }
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
