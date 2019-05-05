<template>
  <div class="modal" @click="onModalClick">
    <div class="modal-box">{{data}}</div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    onModalClick(e) {
      if (e.target.classList.contains("modal")) {
        document.body.classList.remove("modal-open");
      }
    }
  }
};
</script>


<style lang="scss">
.modal {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: auto !important;

  .modal-open & {
    display: flex;
  }

  &-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: auto;
    padding: 15px 30px;
    color: #fff;
    background-color: cornflowerblue;
  }
}
</style>
