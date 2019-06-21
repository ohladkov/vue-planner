<template>
  <div 
    v-if="day.isEmpty"
    class="day" 
    data-empty
  ></div>

  <div 
    v-else
    :data-holiday="holidayTypes"
    :data-period="holidayPeriod"
    @click="onClick"
    class="day" 
    data-toggle="modal"
    data-target="#bookModal"
  >
    <div 
      :data-type="dayPeriodType.morning"
      class="half first" 
    ></div>

    <div class="day-index">
      {{ day.id }}
    </div>

    <div 
      :data-type="dayPeriodType.evening"
      class="half last" 
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    day: {
      type: Object,
      required: true,
    },
    events: {
      type: Array
    }
  },
  data() {
    return {};
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    onClick(e) {
      if (!e.target.dataset.type) {
        this.$eventBus.$emit('showModal', {});
        return;
      }

      const { type } = e.target.dataset;
      const { holiday, period } = e.currentTarget.dataset;

      const payload = {
        type,
        holiday,
        period,
        events: this.allEvents
      };

      this.$eventBus.$emit('showModal', payload);
    },
  },
  computed: {
    allEvents() {
      const { events } = this.$props.day;

      if (events && events.length) {
        return events;
      }

      return [];
    },
    holidayTypes() {
      if (this.allEvents.length) {
        return this.allEvents.map((event) => event.type);
      }

      return null;
    },
    holidayPeriod() {
      if (this.allEvents.length) {
        return this.allEvents.map((event) => event.time_period);
      }

      return null;
    },
    dayPeriodType() {
      const type = {
        morning: null,
        evening: null
      }

      if (this.holidayTypes && this.holidayTypes.length) {
        if (this.holidayPeriod && this.holidayPeriod.length) {
          this.holidayPeriod.forEach((period) => {
            if (period === 'workday') {
              type.morning = 'event';
              type.evening = 'event';
            } else if (period === 'morning') {
              type.morning = 'event';
            } else if (period === 'evening') {
              type.evening = 'event';
            }
          });
        }
      }

      return type;
    }
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

  &[data-holiday="holiday"] {
    --color: green;

    &[data-period="workday"] {
      background-color: var(--color);
    }

    &[data-period="morning"] {
      .first {
        background-color: var(--color);
      }
    }

    &[data-period="evening"] {
      .last {
        background-color: var(--color);
      }
    }
  }

  &[data-holiday="day_off"] {
    --color: orange;

    &[data-period="workday"] {
      background-color: var(--color);
    }

    &[data-period="morning"] {
      .first {
        background-color: var(--color);
      }
    }

    &[data-period="evening"] {
      .last {
        background-color: var(--color);
      }
    }
  }

  &[data-holiday="sickness"] {
    --color: red;

    &[data-period="workday"] {
      background-color: var(--color);
    }

    &[data-period="morning"] {
      .first {
        background-color: var(--color);
      }
    }

    &[data-period="evening"] {
      .last {
        background-color: var(--color);
      }
    }
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
