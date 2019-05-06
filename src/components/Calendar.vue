<template>
  <div id="calendar">
    <h1>
      {{ title }}
      <span>{{ year }}</span>
    </h1>
    <div class="months">
      <Month v-for="month in months" :key="month.name" :month="month" @showModal="showModal" />
    </div>

    <Modal :data="modalData" />
  </div>
</template>

<script>
import axios from 'axios';
import Month from './Month';
import Modal from './Modal';
import { setCurrentDate } from '../helpers/date';
import { setScrollBarWidth } from '../helpers/utils';

export default {
  name: 'Calendar',
  data() {
    return {
      title: 'Planner',
      year: null,
      months: [],
      modalData: {},
    };
  },
  mounted() {
    axios
      .get('https://caf4a712-7701-41f3-b8ba-7ebc3741a8e2.mock.pstmn.io/')
      .then(({ data }) => {
        if (data.success) {
          this.year = data.year;
          data.months.forEach((month) => this.months.push(month));
        }
      })
      .then(() => setScrollBarWidth())
      .then(() => setCurrentDate());
  },
  methods: {
    showModal(data) {
      const parsedDataFrom = Object.values(data.from).join('-');

      this.modalData = {
        ...this.modalData,
        from: parsedDataFrom,
        fromDayPart: data.fromDayPart.dayPart,
      };

      document.body.classList.add('modal-open');
    },
  },
  components: {
    Month,
    Modal,
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
