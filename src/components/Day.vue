<template>
  <div
    class="day"
    :class="{
      'past': isPast
    }"
    :data-date="dateFormat"
    :data-non-working="isNonWorking"
    :data-holiday="isHoliday"
    @click="onClick"
  >
    <div 
      class="half first" 
      :class="{
        'highlighted': dayPart === 1 || (isHoliday && !dayPart),
      }"
      :data-non-working="isNonWorking"
      :data-holiday="isHoliday"
    ></div>

    <span class="day-index">{{ day.id }}</span>
    
    <div 
      class="half second" 
      :class="{
        'highlighted': dayPart === 2 || (isHoliday && !dayPart),
      }"
      ></div>
  </div>
</template>

<script>
import moment from 'moment';
import { getCurrentDate } from '../helpers/date';

export default {
  name: 'Day',
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isNonWorking: this.day.isNonWorking,
      isHoliday: this.day.isHoliday,
      dayPart: this.day.dayPart,
      dateFormat: this.day.format
    }
  },
  methods: {
    onClick(e) {
      const dayNode = e.target.parentNode;

      if (this.isNonWorking || (this.isHoliday && !this.dayPart) || !dayNode.dataset.date) {
        return;
      }

      if (moment(dayNode.dataset.date).isBefore(getCurrentDate())) {
        return;
      }

      if (dayNode.classList.contains('day--non-working')) return;

      const dayPart = e.target.classList.contains('first') ? 'AM' : 'PM';

      this.$emit('onDayClick', {
        from: dayNode.dataset.date,
        fromDayPart: dayPart,
        to: dayNode.dataset.date,
        toDayPart: dayPart,
      });
    },
  },
  computed: {
    isPast() {
      return moment(this.dateFormat).isBefore(getCurrentDate());
    }
  }
};
</script>

<style lang="scss">
.day {
  position: relative;
  display: flex;
  width: calc(100% / var(--daysInWeek));
  min-height: 40px;

  &-index {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &--current {
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

  &.past {
    cursor: not-allowed;
    user-select: none;
    opacity: 0.25;
  }

  &:not(.past) {
    .half {
      &:not(.highlighted) {
        &:hover {
          background-color: rgba(#000, 0.1);
        }
      }
    }
  }
  
  .half {
    width: 100%;
    transition: background-color 0.3s;
  }

  &[data-non-working] {
    background-color: rgba(#000, 0.2);
  }

  &[data-holiday] {
    .highlighted {
      background-color: rgba(crimson, 0.6);
    }
  }
}
</style>
