<template>
  <div id="app">
    <Planner />
  </div>
</template>

<script>
import Planner from './components/Planner.vue';

export default {
  name: 'app',
  components: {
    Planner,
  },
};
</script>

<style lang="scss">
:root {
  --daysInWeek: 7;
}

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;

  &.modal-open {
    padding-right: calc(var(--scrollBarWidth) * 1px);
    overflow: hidden;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
