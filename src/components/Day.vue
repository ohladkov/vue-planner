<template>
  <div v-if="day.isEmpty" class="day" data-empty></div>

  <div
    v-else
    :class="{ nwd: freeDay }"
    :data-holiday="holidayTypes.length > 1 ? 'multiple' : holidayTypes"
    :data-period="holidayPeriod"
    :data-current="day.isToday"
    @click="onClick"
    class="day"
    data-toggle="modal"
    data-target="#bookModal"
  >
    <div :data-type="dayPeriodType.am" class="half first"></div>

    <div class="day-index">
      {{ day.id }}
    </div>

    <div :data-type="dayPeriodType.pm" class="half last"></div>
  </div>
</template>

<script>
import { MORNING, EVENING, FULL_DAY, EVENT_TYPE } from '../helpers/constants';

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
      const { events, schedule } = this.$props.day;

      if (Array.isArray(events)) {
        events.forEach((event) => {
          if (schedule) {
            if (event.time_from <= schedule.m.f && event.time_to < schedule.a.f) {
              event.time_period = MORNING;
            } else if (event.time_from >= schedule.a.f) {
              event.time_period = EVENING;
            } else {
              event.time_period = FULL_DAY;
            }
          } else {
            event.time_period = FULL_DAY;
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
        return Array.from(new Set(this.allEvents.map((event) => event.type)));
      }

      return [];
    },
    holidayPeriod() {
      if (this.allEvents.length) {
        return Array.from(new Set(this.allEvents.map((event) => event.time_period))).length > 1
          ? [FULL_DAY]
          : Array.from(new Set(this.allEvents.map((event) => event.time_period)));
      }

      return [];
    },
    dayPeriodType() {
      const type = {
        [MORNING]: null,
        [EVENING]: null,
      };

      this.holidayPeriod.forEach((period) => {
        if (period === FULL_DAY) {
          type[MORNING] = EVENT_TYPE;
          type[EVENING] = EVENT_TYPE;
        } else if (period === MORNING) {
          type[MORNING] = EVENT_TYPE;
        } else if (period === EVENING) {
          type[EVENING] = EVENT_TYPE;
        }
      });

      return type;
    },
    freeDay() {
      const { schedule } = this.$props.day;

      return !schedule;
    }
  },
};
</script>

<style lang="scss">
$gradient: 'linear-gradient(135deg, crimson, darkorange, violet)';

$holidaysList: (
  'holiday': 'seagreen',
  'day_off': 'darkorange',
  'sickness': 'crimson',
  'workday': 'violet',
  'public_holiday': 'gold',
  'locked': 'peru',
);

@mixin holidays($holidayTypes) {
  @each $key, $value in $holidayTypes {
    &[data-holiday='#{$key}'] {
      &[data-period='workday'] {
        color: #fff;
        background-color: unquote($string: $value);
      }

      &[data-period='am'] {
        .first {
          background-color: unquote($string: $value);
        }
      }

      &[data-period='pm'] {
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

  &.nwd {
    background-color: #eee;
  }

  &[data-is-past],
  &[data-empty] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-holiday='multiple'] {
    &[data-period='workday'] {
      color: #fff;
      background-image: unquote($gradient);
    }

    &[data-period='am'] {
      .first {
        background-image: unquote($gradient);
      }
    }

    &[data-period='pm'] {
      .last {
        background-image: unquote($gradient);
      }
    }
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
