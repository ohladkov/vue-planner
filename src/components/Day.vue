<template>
  <div 
    class="day" 
    :data-date="day.format" 
    :data-is-past="isPast" 
    @click="onClick">
    <div
      class="half first"
      :class="[
        day.nonWorkingDay.id ? 'nwd' : '',
        isOpenAM ? 'isOpen' : '',
        day.holiday.am_type
      ]"
      :data-holiday-id="day.holiday.am_hol_id"
      :data-title="day.holiday.am_name"
    >
      <div 
        class="tooltip_c" 
        v-show="isOpenAM" 
        v-html="tooltipContent"
      ></div>
    </div>

    <div class="day-index">{{ day.id }}</div>

    <div
      class="half second"
      :class="[
        day.nonWorkingDay.id ? 'nwd' : '', 
        isOpenPM ? 'isOpen' : '', 
        day.holiday.pm_type
      ]"
      :data-holiday-id="day.holiday.pm_hol_id"
      :data-title="day.holiday.pm_name"
    >
      <div 
        class="tooltip_c" 
        v-show="isOpenPM" 
        v-html="tooltipContent"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      isOpenAM: false,
      isOpenPM: false,
      tooltipContent: `<span class="loading-msg">loading ...</span>`,
    };
  },
  mounted() {},
  methods: {
    onClick(e) {
      const dayNode = e.target.parentNode;

      if (
        e.target.classList.contains('nwd') ||
        moment(dayNode.dataset.date).isBefore(getCurrentDate()) ||
        !dayNode.dataset.date
      ) {
        return;
      }

      if (e.target.dataset.holidayId > 0) {
        if (e.target.classList.contains('first')) {
          this.isOpenAM = !this.isOpenAM;
        } else {
          this.isOpenPM = !this.isOpenPM;
        }

        this.asyncMethod(e.target.dataset.holidayId);

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
    asyncMethod(id) {
      if (id) {
        const self = this;

        return axios.get('http://www.mocky.io/v2/5ce24deb340000a30c7732e3').then(({ data }) => {
          self.tooltipContent = `
            <div>Type: ${data.type}</div>
            <div>Date: ${data.date}</div>
            <div>BookedDate: ${data.bookedDate}</div>
          `;
        });
      }

      return 'tooltip';
    },
  },
  computed: {
    isPast() {
      return moment(this.$props.day.format).isBefore(getCurrentDate());
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
