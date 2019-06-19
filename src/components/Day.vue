<template>

  <div 
    v-if="day.isEmpty"
    class="day" 
    data-empty
  ></div>

  <div 
    v-else
    class="day" 
    data-toggle="modal"
    data-target="#bookModal"
    @click="onClick"
  >
    <button 
      type="button" 
      class="half first" 
      data-type="booking"
    ></button>

    <div class="day-index">
      {{ day.id }}
    </div>

    <button 
      type="button" 
      class="half last" 
      data-type="events"
    ></button>
  </div>
</template>

<script>
import moment from 'moment';
import { getCurrentDate, dateToIsoString } from '../helpers/dateUtils';

export default {
  name: 'Day',
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    onClick(e) {
      const { type } = e.target.dataset;

      const payload = {
        type
      };

      this.$eventBus.$emit('showModal', payload);
    },
  },
  computed: {
    isPast() {
      return moment(dateToIsoString(this.$props.day.format)).isBefore(getCurrentDate());
    },
  },
};
</script>

<style lang="scss">
.day {
  position: relative;
  display: flex;
  width: calc(100% / var(--daysInWeek));
  min-height: 40px;
  user-select: none;

  &-index {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &[data-is-past],
  &[data-empty] {
    pointer-events: none;
    opacity: 0.5;
  }

  &:hover {
    z-index: 2;
    outline: 1px solid rgba(#000, 0.025);
  }

  .half {
    position: relative;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    transition: background-color 0.3s;
    appearance: none;

    &:focus {
      outline: 0;
    }

    &:hover {
      background-color: rgba(#000, 0.1);
    }

    &::after {
      display: none;
      content: attr(data-title);
      position: absolute;
      top: calc(100% + 5px);
      left: 50%;
      z-index: 1;
      transform: translateX(-50%);
      padding: 5px 10px;
      color: #fff;
      border-radius: 4px;
      background-color: rgba(#000, 0.9);
    }

    &[data-title]:not(.isOpen) {
      &:hover {
        &::after {
          display: block;
        }
      }
    }

    &.nwd {
      background-color: rgba(#000, 0.2);
    }

    &.holiday {
      background-color: rgba(green, 0.7);
    }

    &.sickness {
      background-color: rgba(red, 0.7);
    }

    &.selected {
      background-color: lightblue;
    }
  }

  .info {
    position: absolute;
    top: 100%;
    left: 50%;
    max-width: 260px;
    width: 100%;
    border: 1px solid #000;
    transform: translateX(-50%);
  }
}

[data-current] {
  .day-index {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      border: 2px solid rgba(#000, 0.5);
      border-radius: 50%;
    }
  }
}
</style>
