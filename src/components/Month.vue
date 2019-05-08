<template>
  <div class="month">
    <h2>{{ month.name }}</h2>

    <Week />

    <div class="days-list">
      <div v-for="(day, index) in offsetDays" :key="index + 100" class="day day--offset">&nbsp;</div>

      <div
        v-for="(day, index) in daysList"
        :key="index"
        :class="{
          'day--non-working': day.isNonWorking,
          'day--holiday': day.isHoliday && !day.holidayDayPart,
          'day--holiday-am': day.isHoliday && day.holidayDayPart === 1,
          'day--holiday-pm': day.isHoliday && day.holidayDayPart === 2,
        }"
        @click.prevent="onClick"
        :data-date="formatDate(index + 1)"
        class="day"
      >
        <div class="half first"></div>
        <span class="day-index">{{ day.id }}</span>
        <div class="half second"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Week from './Week';

export default {
  name: 'Month',
  props: {
    month: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    onClick(e) {
      const dayNode = e.target.parentNode;

      if (dayNode.classList.contains('day--non-working')) return;

      const dayPart = e.target.classList.contains('first') ? 'AM' : 'PM';

      this.$emit('toggleModal', {
        from: dayNode.dataset.date,
        fromDayPart: dayPart,

        to: dayNode.dataset.date,
        toDayPart: dayPart,
      });
    },
    formatDate(day) {
      const { year, monthNum } = this.$props.month;

      return `${year}-${monthNum}-${day}`;
    },
  },
  computed: {
    daysList() {
      const { days, nonWorkingDays, holidays } = this.$props.month;

      const daysList = [];

      for (let i = 1; i <= days; i++) {
        const dayObj = {
          id: i,
          isNonWorking: false,
          isHoliday: false,
        };

        if (nonWorkingDays && nonWorkingDays.length) {
          nonWorkingDays.forEach((day) => {
            if (dayObj.id === day.dayNum) {
              dayObj.isNonWorking = true;
            }
          });
        }

        if (holidays && holidays.length) {
          holidays.forEach((day) => {
            if (dayObj.id === day.dayNum) {
              dayObj.isHoliday = true;

              if (day.dayPart) {
                dayObj.holidayDayPart = day.dayPart;
              }
            }
          });
        }

        daysList.push(dayObj);
      }

      console.log(daysList);

      return daysList;
    },
    offsetDays() {
      return this.month.monthStart;
    },
  },
  components: {
    Week,
  },
};
</script>

<style lang="scss">
.month {
  padding: 1rem;
}

.days-list {
  display: flex;
  flex-wrap: wrap;
}

.day {
  position: relative;
  display: flex;
  width: calc(100% / var(--daysInWeek));
  min-height: 40px;

  &-index {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &:not(.day--offset) {
    border: 1px solid rgba(#000, 0.05);
  }

  &:not(.day--non-working):not(.day--holiday) {
    .half {
      &:hover {
        background-color: #f1f1f1;
      }
    }
  }

  .half {
    width: 100%;
    transition: background-color 0.3s;
  }
}

.day {
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
        border: 2px solid rgba(#000, 0.7);
        border-radius: 50%;
      }
    }
  }

  &--non-working {
    background-color: rgba(#000, 0.08);
  }

  &--holiday {
    color: #fff;
    background-color: crimson;

    &-am,
    &-pm {
      background-color: #fff;
    }

    &-am {
      .first {
        background-color: crimson;
      }
    }

    &-pm {
      .second {
        background-color: crimson;
      }
    }
  }

  &--offset {
    pointer-events: none;
    user-select: none;
  }
}
</style>
