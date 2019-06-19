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

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
