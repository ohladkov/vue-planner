<template>
  <div class="day" :data-date="day.format" :data-is-past="isPast" @click="onClick">
    <div
      class="half first"
      :class="[day.nonWorkingDay.id ? 'nwd' : '', day.holiday.am_type]"
      :data-holiday-id="day.holiday.am_hol_id"
      :data-title="day.holiday.am_name"
    ></div>

    <div class="day-index">{{ day.id }}</div>

    <div
      class="half second"
      :class="[day.nonWorkingDay.id ? 'nwd' : '', day.holiday.pm_type]"
      :data-holiday-id="day.holiday.pm_hol_id"
      :data-title="day.holiday.pm_name"
    ></div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { getCurrentDate, dateToIsoString } from '../helpers/date';

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
        e.target.classList.contains('nwd') ||
        !dayNode.dataset.date
      ) {
        return;
      }

      if (e.target.dataset.holidayId) {
        return axios.get('http://www.mocky.io/v2/5ce24deb340000a30c7732e3').then(({ data }) => {
          const { bookedDate, date, type } = data;

          this.$emit('onDayClick', {
            type: 'book-info',
            bookingContent: {
              bookedDate,
              date,
              type,
            },
          });
        });
      }

      const dayPart = e.target.classList.contains('first') ? 'AM' : 'PM';

      this.$emit('onDayClick', {
        type: 'book-form',
        from: dayNode.dataset.date,
        fromDayPart: dayPart,
        to: dayNode.dataset.date,
        toDayPart: dayPart,
      });
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
.tooltip_c {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 240px;
  padding: 5px 10px;
  text-align: left;
  color: #fff;
  background-color: rgba(#000, 0.8);

  .loading-msg {
    display: block;
    text-align: center;
    white-space: nowrap;
  }
}

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

  &[data-is-past] {
    pointer-events: none;
    opacity: 0.5;
  }

  &:hover {
    z-index: 2;
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
