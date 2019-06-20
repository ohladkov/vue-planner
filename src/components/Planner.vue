<template>
  <div class="planner">
    <Calendar />

    <Modal :type="modalType" />
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
      modalType: null,
    };
  },
  mounted() {
    this.$eventBus.$on('showModal', (payload) => {
      this.modalType = payload.type;
    });
  },
};
</script>
