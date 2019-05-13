<template>
  <div class="month">
    <h2>{{ month.name }}</h2>

    <Week />

    <div class="days-list">
      <div class="day day--offset" v-for="day in month.monthStart" :key="'offsetday: ' + day">&nbsp;</div>

      <Day v-for="day in daysList" :key="day.id" :day="day" @onDayClick="onDayClick" />
    </div>
  </div>
</template>

<script>
import Week from './Week';
import Day from './Day';

export default {
  name: 'Month',
  props: {
    month: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    onDayClick(data) {
      this.$emit('toggleModal', data);
    },
    formatDate(day) {
      const { year, monthNum } = this.$props.month;

      return `${year}-${monthNum}-${day}`;
    },
  },
  computed: {
    daysList() {
      const { days, nonWorkingDays, holidays } = this.$props.month;

      const daysList = [];
      const parsedHolidays = {};

      for (const [, val] of Object.entries(holidays)) {
        parsedHolidays[val.day] = val;
      }

      for (let i = 1; i <= days; i++) {
        const dayObj = {
          id: i,
          format: this.formatDate(i),
          nonWorkingDay: {},
          holiday: {},
        };

        if (nonWorkingDays.length) {
          nonWorkingDays.forEach((nonWorkingDay) => {
            if (i === nonWorkingDay.day) {
              dayObj.nonWorkingDay.id = nonWorkingDay.day;
              dayObj.nonWorkingDay.name = nonWorkingDay.name;
              dayObj.nonWorkingDay.dayPart = nonWorkingDay.dayPart;
            }
          });
        }

        Object.values(parsedHolidays).map((holiday) => {
          if (i === holiday.day) {
            dayObj.holiday = holiday;
          }
        });

        daysList.push(dayObj);
      }

      return daysList;
    },
    offsetDays() {
      return this.month.monthStart;
    },
  },
  components: {
    Week,
    Day,
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
