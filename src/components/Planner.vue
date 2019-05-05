<template>
  <div class="planner">
    <Calendar />
  </div>
</template>

<script>
import Calendar from './Calendar';

export default {
  name: 'Planner',
  components: {
    Calendar,
  }
}
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
</style>
