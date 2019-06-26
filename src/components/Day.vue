<template>
  <div v-if="day.isEmpty" class="day" data-empty></div>

  <div
    v-else
    :class="{ 'has-multiple-events': holidayTypes.length > 1 }"
    :data-holiday="holidayTypes"
    :data-period="holidayPeriod"
    @click="onClick"
    class="day"
    data-toggle="modal"
    data-target="#bookModal"
  >
    <div :data-type="dayPeriodType.morning" class="half first"></div>

    <div class="day-index">
      {{ day.id }}
    </div>

    <div :data-type="dayPeriodType.evening" class="half last"></div>
  </div>
</template>

<script>
import { MORNING, EVENING } from '../helpers/constants';

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
  methods: {
    onClick(e) {
      if (!e.target.dataset.type) {
        const period = e.target.matches('.first') ? MORNING : EVENING;
        return this.$eventBus.$emit('showModal', { date: this.$props.day.date, period });
      }

      const { holiday, period } = e.currentTarget.dataset;
      const { type } = e.target.dataset;

      const payload = {
        type,
        holiday,
        period,
        events: this.allEvents,
      };

      this.$eventBus.$emit('showModal', payload);
    },
  },
  computed: {
    allEvents() {
      const { events } = this.$props.day;

      if (events && events.length) {
        events.forEach((event) => {
          if (!event.time_period) {
            event.time_period = 'workday';
          }

          if (!event.date_from) {
            event.date_from = this.$props.day.date;
          }

          if (!event.date_to) {
            event.date_to = this.$props.day.date;
          }
        });

        return events;
      }

      return [];
    },
    holidayTypes() {
      if (this.allEvents.length) {
        return this.allEvents.map((event) => event.type);
      }

      return [];
    },
    holidayPeriod() {
      if (this.allEvents.length) {
        return this.allEvents.map((event) => event.time_period);
      }

      return [];
    },
    dayPeriodType() {
      const type = {
        morning: null,
        evening: null,
      };

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
    },
  },
};
</script>

<style lang="scss">
$holidaysList: (
  'holiday': 'green',
  'days_off': 'orange',
  'sickness': 'red',
  'workday': 'blue',
  'p_holiday': 'yellow',
  'locked': 'deeppink',
);

@mixin holidays($holidayTypes) {
  @each $key, $value in $holidayTypes {
    &[data-holiday='#{$key}'] {
      &[data-period='workday'] {
        background-color: unquote($string: $value);
      }

      &[data-period='morning'] {
        .first {
          background-color: unquote($string: $value);
        }
      }

      &[data-period='evening'] {
        .last {
          background-color: unquote($string: $value);
        }
      }
    }
  }
}

.day {
  @include holidays($holidaysList);

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

  &.has-multiple-events {
    background-image: linear-gradient(
      135deg,
      hotpink 12.5%,
      red 12.5%,
      red 25%,
      orange 25%,
      orange 37.5%,
      yellow 37.5%,
      yellow 50%,
      green 50%,
      green 62.5%,
      turquoise 62.5%,
      turquoise 75%,
      indigo 75%,
      indigo 87.5%,
      violet 87.5%
    );
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
