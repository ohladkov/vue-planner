<template>
  <div class="day" :class="{ 'non-working': day.nonWorkingDay.id }" :data-date="day.format" @click="onClick">
    <div
      class="half first"
      :class="day.holiday.am_type"
      :data-holiday-id="day.holiday.am_hol_id"
      :data-title="day.holiday.am_name"
    ></div>

    <div class="day-index">
      {{ day.id }}
    </div>

    <div
      class="half second"
      :class="day.holiday.pm_type"
      :data-holiday-id="day.holiday.pm_hol_id"
      :data-title="day.holiday.pm_name"
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
    return {};
  },
  mounted() {},
  methods: {
    onClick(e) {
      const dayNode = e.target.parentNode;

      if (
        dayNode.classList.contains('non-working') ||
        moment(dayNode.dataset.date).isBefore(getCurrentDate()) ||
        !dayNode.dataset.date
      ) {
        return;
      }

      if (e.target.dataset.holiday || e.target.dataset.sickness) {
        return;
      }

      const dayPart = e.target.classList.contains('first') ? 'AM' : 'PM';

      this.$emit('onDayClick', {
        from: dayNode.dataset.date,
        fromDayPart: dayPart,
        to: dayNode.dataset.date,
        toDayPart: dayPart,
      });
    },
  },
  computed: {},
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

  &.non-working {
    background-color: rgba(#000, 0.2);
  }

  .half {
    position: relative;
    width: 100%;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(#000, 0.1);
    }

    &::after {
      display: none;
      content: attr(data-title);
      position: absolute;
      top: 100%;
      left: 50%;
      z-index: 1;
      transform: translateX(-50%);
      padding: 5px 10px;
      color: #fff;
      border-radius: 4px;
      background-color: rgba(#000, 0.9);
    }

    &[data-title] {
      &:hover {
        &::after {
          display: block;
        }
      }
    }

    &.holiday {
      background-color: rgba(green, 0.7);
    }

    &.sickness {
      background-color: rgba(red, 0.7);
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
