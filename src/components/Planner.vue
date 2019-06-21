<template>
  <div class="planner">
    <Calendar />

    <Modal :modalInfo="modalInfo" />
  </div>
</template>

<script>
import Calendar from './Calendar';
import Modal from './Modal';

export default {
  name: 'Planner',
  components: {
    Calendar,
    Modal
  },
  data() {
    return {
      modalInfo: {},
    };
  },
  mounted() {
    this.$eventBus.$on('showModal', (payload) => {
      this.modalInfo = payload;
    });
  },
};
</script>
