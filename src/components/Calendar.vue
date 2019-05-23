<template>
  <div id="calendar" @click="onClick">
    <h1>
      {{ title }}
      <span>{{ year }}</span>
    </h1>
    <div class="months">
      <Month v-for="month in months" :key="month.name" :month="month" @toggleModal="toggleModal" />
    </div>

    <Modal :modalData="modalData" />
  </div>
</template>

<script>
import axios from 'axios';
import Month from './Month';
import Modal from './Modal';
import { setCurrentDate } from '../helpers/date';
import { setScrollBarWidth } from '../helpers/utils';

const url = 'http://www.mocky.io/v2/5ce648133300004a007313d2';

export default {
  name: 'Calendar',
  data() {
    return {
      title: 'Planner',
      year: null,
      months: [],
      modalData: {
        type: null,
        from: null,
        fromDayPart: null,
        to: null,
        toDayPart: null,
        bookingContent: {},
      },
    };
  },
  mounted() {
    // const self = this;

    axios
      .get(url)
      .then(({ data }) => {
        if (data.success) {
          this.year = data.year;
          data.months.forEach((month) => this.months.push(month));
        }
      })
      .then(() => setScrollBarWidth())
      .then(() => setCurrentDate());

    // let selectionFlag = false;

    // document.addEventListener('mousedown', (e) => {
    //   if (!e.target.classList.contains('half') || e.target.dataset.holidayId > 0) return;

    //   selectionFlag = true;
    //   self.bookData.from = e.target.parentNode.dataset.date;
    //   self.bookData.fromDayPart = e.target.classList.contains('first') ? 'AM' : 'PM';

    //   e.target.classList.add('selected');
    // });

    // document.addEventListener('mouseover', (e) => {
    //   if (!e.target.classList.contains('half') || e.target.dataset.holidayId > 0) {
    //     removeSelection();
    //     selectionFlag = false;

    //     return;
    //   }

    //   if (selectionFlag) {
    //     e.target.classList.add('selected');
    //   }
    // });

    // document.addEventListener('mouseup', (e) => {
    //   if (!e.target.classList.contains('half') || e.target.dataset.holidayId > 0) return;

    //   selectionFlag = false;
    //   self.bookData.to = e.target.parentNode.dataset.date;
    //   self.bookData.toDayPart = e.target.classList.contains('first') ? 'AM' : 'PM';

    //   removeSelection();

    //   this.toggleModal();
    // });

    // const removeSelection = () => {
    //   document.querySelectorAll('.days-list .selected').forEach((el) => {
    //     el.classList.remove('selected');
    //   });
    // };
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

      this.modalData = {
        ...this.modalData,
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
