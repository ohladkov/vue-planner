<template>
  <div id="calendar" class="calendar" :class="{ loading: isLoading }">
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
        :schedule="schedule"
        :currentDate="currentDate"
      />
    </div>

    <Modal :schedule="schedule" />
  </div>
</template>

<script>
import Month from './Month';
import Modal from './Modal';
import Event from '../api/event';
import Planner from '../api/planner';
import { months } from '../helpers/constants';
import { sortEventsByMonth, getCurrentDate } from '../helpers/dateUtils';
import { isEmptyObject } from '../helpers/utils';

export default {
  name: 'Calendar',
  components: {
    Month,
    Modal,
  },
  data() {
    return {
      title: 'Planner',
      year: new Date().getFullYear(),
      events: {},
      specialEvents: {},
      schedule: {},
      currentDate: getCurrentDate(),
      months,
      isLoading: true,
    };
  },
  async mounted() {
    await this.getPlannerData();

    this.isLoading = false;

    this.$eventBus.$on('bookEvent', async (data) => {
      const response = await Event.book(data);

      if (response) {
        this.updatePlannerData();
      }
    });

    this.$eventBus.$on('cancelEvent', async (id) => {
      const response = await Event.cancel(id);

      if (response) {
        this.updatePlannerData();
      }
    });
  },
  methods: {
    async getPlannerData() {
      this.isLoading = true;
      const response = await Planner.render();

      if (!response.isSuccess()) return;

      const data = await response.getData();

      this.year = data.year;
      this.events = data.events;
      this.specialEvents = data.specialDays;
      this.schedule = data.schedule;

      return data;
    },
    async updatePlannerData() {
      await this.getPlannerData();

      this.isLoading = false;

      const $modal = jQuery('#bookModal');

      if (($modal.data('bs.modal') || {}).isShown) {
        $modal.modal('hide');
      }

      document.dispatchEvent(plannerUpdatedEvent);
    },
  },
  computed: {
    eventsDays() {
      if (!isEmptyObject(this.events)) {
        return sortEventsByMonth(this.events);
      }

      return {};
    },
    specialDays() {
      if (!isEmptyObject(this.specialEvents)) {
        return sortEventsByMonth(this.specialEvents);
      }

      return {};
    },
  },
};
</script>

<style lang="scss">
.calendar {
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 50px auto;

  &.loading {
    &::after {
      opacity: 1;
      visibility: visible;
    }
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1051;
    width: 100%;
    height: 100%;
    background-color: rgba(#fff, 0.7);
    background-image: url('../assets/spinner.svg');
    background-repeat: no-repeat;
    background-position: center;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
  }
}
.months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
