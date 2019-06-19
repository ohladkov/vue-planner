<template>
  <div class="week">
    <div class="week-day" v-for="day in week" :key="day">{{ day }}</div>
  </div>
</template>

<script>
import { week } from '../helpers/constants';

export default {
  name: 'Week',
  data() {
    return {
      week,
    };
  },
};
</script>

<style lang="scss">
.week {
  display: flex;
  margin-bottom: 0.75rem;

  &-day {
    width: calc(100% / var(--daysInWeek));
    padding: 0.5rem;
  }
}
</style>
