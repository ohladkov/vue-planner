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

export default {
  name: 'Month',
  props: {
    month: {
      type: Object,
      required: true,
    },
    year: {
      required: true,
    },
    monthNum: {
      type: Number,
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
  mounted() {},
  methods: {},
  computed: {
    daysList() {
      const { year, monthNum } = this.$props;
      const days = getDaysInMonth(year, monthNum);
      const offsetDays = getDaysOffset(new Date(year, monthNum));

      const daysList = [];

      for (let i = -offsetDays; i <= days; i++) {
        const day = {
          id: i,
        };

        if (i <= 0) {
          day.isEmpty = true;
        }

        daysList.push(day);
      }

      return daysList;
    },
    offsetDays() {
      return {};
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
