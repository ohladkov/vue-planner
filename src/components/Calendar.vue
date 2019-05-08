<template>
  <div id="calendar" @click="onClick">
    <h1>
      {{ title }}
      <span>{{ year }}</span>
    </h1>
    <div class="months">
      <Month v-for="month in months" :key="month.name" :month="month" @toggleModal="toggleModal" />
    </div>

    <Modal :bookData="bookData" />
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
      bookData: {},
    };
  },
  mounted() {
    axios
      .get('http://www.mocky.io/v2/5cd29f6e3100008628339892')
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
    onClick(e) {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        this.toggleModal();
      }
    },
    toggleModal(data) {
      this.isModalVisible = !this.isModalVisible;

      if (!this.isModalVisible) {
        document.body.classList.remove('modal-open');
        return;
      }

      this.bookData = {
        ...this.bookData,
        ...data,
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
