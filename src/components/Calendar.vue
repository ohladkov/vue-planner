<template>
  <div id="calendar">
    <h1>
      {{ title }}
      <span>{{ year }}</span>
    </h1>

    <div class="months">
      <Month
        v-for="(month, index) in months"
        :key="month.name"
        :month="month"
        :year="year"
        :events="eventsDays[index + 1]"
        :specialEvents="specialDays[index + 1]"
      />
    </div>

    <Modal :modalInfo="modalInfo" />
  </div>
</template>

<script>
import Month from './Month';
import Modal from './Modal';
import { Api } from '../api/api';
import { months } from '../helpers/constants';
import { sortEventsByMonth } from '../helpers/dateUtils';

export default {
  name: 'Calendar',
  components: {
    Month,
    Modal
  },
  data() {
    return {
      title: 'Planner',
      year: new Date().getFullYear(),
      events: {},
      specialEvents: {},
      schedule: {},
      modalInfo: {},
      months,
    };
  },
  mounted() {
    this.setData();

    this.$eventBus.$on('showModal', (payload) => {
      this.modalInfo = {...payload, ...this.schedule};
    });
  },
  methods: {
    async setData() {
      const response = await Api.get('planner');

      if (!response.isSuccess()) return;

      const data = await response.getData();

      this.year = data.year;
      this.events = data.events;
      this.specialEvents = data.specialDays;
      this.schedule = data.schedule;

      return data;
    },
  },
  computed: {
    eventsDays() {
      return sortEventsByMonth(this.events);
    },
    specialDays() {
      return sortEventsByMonth(this.specialEvents);
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
