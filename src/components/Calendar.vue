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
        :events="eventsDays[index+1]"
        :specialEvents="specialDays[index+1]"
      />
    </div>
  </div>
</template>

<script>
import Month from './Month';
import { Api } from '../api/api';
import { months } from '../helpers/constants';

export default {
  name: 'Calendar',
  components: {
    Month,
  },
  data() {
    return {
      title: 'Planner',
      year: new Date().getFullYear(),
      events: {},
      specialEvents: {},
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
      this.events = data.events;
      this.specialEvents = data.specialDays;

      return data;
    },
  },
  computed: {
    eventsDays() {
      const eventsEntries = Object.entries(this.events);
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
    },
    specialDays() {
      const specialEntries = Object.entries(this.specialEvents);
      const specialEvents = {};

      specialEntries.forEach((entry) => {
        const [entryDate] = entry;
        const month = new Date(entryDate).getMonth() + 1;

        if (!specialEvents[month]) {
          specialEvents[month] = [];
        }

        specialEvents[month].push(entry);
      });

      return specialEntries;
    }
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
