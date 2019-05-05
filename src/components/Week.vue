<template>
  <div class="week">
    <div class="week-day" v-for="day in days" :key="day">{{day}}</div>
  </div>
</template>

<script>
export default {
  name: 'Week',
  data() {
    return {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  }
}
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
