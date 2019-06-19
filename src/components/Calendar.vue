<template>
  <div id="calendar">
    <h1>
      {{ title }}
      <span>{{ year }}</span>
    </h1>

    <div class="months">
      <Month v-for="(month, index) in months" :key="month.name" :month="month" :monthNum="index" :year="year" />
    </div>
  </div>
</template>

<script>
import { Api } from '../api/api';
import Month from './Month';
import { months } from '../helpers/constants';

export default {
  name: 'Calendar',
  components: {
    Month,
  },
  data() {
    return {
      title: 'Planner',
      year: null,
      months,
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      const response = await Api.get('planner');

      if (!response.isSuccess()) return;

      const data = await response.getData();

      this.year = data.year;

      if (data.months) {
        this.year = data.year;
        data.months.forEach((month) => this.months.push(month));
      }

      return data;
    },
  },
};
</script>

<style lang="scss">
.months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 900px;
  width: 100%;
  margin: 50px auto;
}
</style>
