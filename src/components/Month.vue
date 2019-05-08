<template>
  <div class="month">
    <h2>{{ month.name }}</h2>

    <Week />

    <div class="days-list">
      <div class="day day--offset" v-for="day in month.monthStart" :key="'offsetday: ' + day">&nbsp;</div>

      <Day 
        v-for="day in daysList" 
        :key="day.id" 
        :day="day"
        @onDayClick="onDayClick"
      />

    </div>
  </div>
</template>

<script>
import Week from './Week';
import Day from './Day'

export default {
  name: 'Month',
  props: {
    month: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
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

      for (let i = 1; i <= days; i++) {
        const dayObj = {
          id: i,
          isNonWorking: false,
          isHoliday: false,
          format: this.formatDate(i)
        };

        if (nonWorkingDays && nonWorkingDays.length) {
          nonWorkingDays.forEach((day) => {
            if (dayObj.id === day.dayNum) {
              dayObj.isNonWorking = true;
            }
          });
        }

        if (holidays && holidays.length) {
          holidays.forEach((day) => {
            if (dayObj.id === day.dayNum) {
              dayObj.isHoliday = true;

              if (day.dayPart) {
                dayObj.dayPart = day.dayPart;
              }
            }
          });
        }

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
    Day
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
