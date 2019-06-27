<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h3 class="modal-title">Book time off</h3>
    </div>
    <div class="modal-body">
      <form action="#" id="book-form">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="type">Holiday type</label>
                <select v-model="holiday['selected']" @change="onHolidayChange" class="form-control" name="type" id="type">
                  <option v-for="option in holiday.options" :key="option.id" :value="option">
                    {{ option.split('_').join(' ') }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row">
                <div class="col-md-7">
                  <div class="form-group">
                    <label for="date_from">Starting</label>
                    <datepicker
                      v-model="from.date"
                      :mondayFirst="true"
                      @selected="onSelect"
                      format="D, dd MMM yy"
                      class="form-control"
                      name="date_from"
                      id="date_from"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="time_from">&nbsp;</label>
                    <select
                      v-model="from['selected']"
                      @change="onChange"
                      class="form-control"
                      name="time_from"
                      id="time_from"
                    >
                      <option v-for="option in startTimeList" :key="option.value" :value="option.value">
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row">
                <div class="col-md-7">
                  <div class="form-group">
                    <label for="date_to">Ending</label>
                    <datepicker
                      v-model="to.date"
                      format="D, dd MMM yy"
                      :mondayFirst="true"
                      :disabledDates="disabledDates"
                      :disabled="isDatepickerDisabled"
                      class="form-control"
                      name="date_to"
                      id="date_to"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="time_to">&nbsp;</label>
                    <select v-model="to['selected']" class="form-control" name="time_to" id="time_to">
                      <option v-for="option in endTimeList" :key="option.value" :value="option.value">
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for="reason">Reason</label>
                <textarea
                  v-model="reason"
                  id="reason"
                  class="form-control"
                  rows="3"
                  name="reason"
                  placeholder="Reason for time of..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" form="book-form" class="btn btn-lg btn-success">Send request</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { isBefore, createTimesList, getDayName } from '../helpers/dateUtils';
import { holidayTypes, holidayParts, MORNING, EVENING, DAY_OFF } from '../helpers/constants';
import { isEmptyObject } from '../helpers/utils';

const SELECTED_OPTION = 'selected';

export default {
  name: 'BookForm',
  props: {
    schedule: {
      required: true,
      type: Object,
    },
  },
  components: {
    Datepicker,
  },
  data() {
    return {
      reason: '',
      holiday: {
        [SELECTED_OPTION]: holidayTypes[0],
        options: holidayTypes,
      },
      from: {
        date: new Date(),
        [SELECTED_OPTION]: holidayParts.start[0].value,
      },
      to: {
        date: new Date(),
        [SELECTED_OPTION]: holidayParts.end[0].value,
      },
      disabledDates: {
        to: new Date(),
      },
    };
  },
  created() {
    this.$eventBus.$on('showModal', (payload) => {
      this.from.date = payload.date;
      this.to.date = payload.date;

      this.from[SELECTED_OPTION] = payload.period;
      this.to[SELECTED_OPTION] = payload.period;

      this.disabledDates.to = new Date(payload.date);
    });
  },
  methods: {
    onSelect(date) {
      if (isBefore(this.to.date, date)) {
        this.to.date = new Date(date);
      }

      this.to[SELECTED_OPTION] = this.startTimeList[0].value;

      this.disabledDates.to = new Date(date);
    },
    onChange(e) {
      if (this.from[SELECTED_OPTION] === MORNING || this.from[SELECTED_OPTION] === EVENING) {
        this.to[SELECTED_OPTION] = e.target.value;
      }
    },
    onHolidayChange() {
      if (this.holiday[SELECTED_OPTION] !== DAY_OFF) {
        this.from[SELECTED_OPTION] = this.startTimeList[0].value;
        this.to[SELECTED_OPTION] = this.endTimeList[0].value;
      }
    },
  },
  computed: {
    scheduleHoursList() {
      const { schedule } = this.$props;
      const currentDay = getDayName(this.from.date);

      if (isEmptyObject(schedule[currentDay])) {
        return [];
      }

      const startTime = schedule[currentDay] && schedule[currentDay].m.f;
      const endTime = schedule[currentDay] && schedule[currentDay].a.t;

      return createTimesList(startTime, endTime);
    },
    startTimeList() {
      if (!this.scheduleHoursList.length) {
        this.$set(this.from, SELECTED_OPTION, holidayParts.start[0].value);
        return holidayParts.start;
      }

      if (this.holiday[SELECTED_OPTION] !== DAY_OFF) {
        this.$set(this.from, SELECTED_OPTION, holidayParts.start[0].value);
        return holidayParts.start;
      }

      const timeList = [...holidayParts.start, ...this.scheduleHoursList.slice(0, -1)];
      this.$set(this.from, SELECTED_OPTION, timeList[0].value);

      return timeList;
    },
    endTimeList() {
      if (!this.scheduleHoursList.length) {
        this.$set(this.to, SELECTED_OPTION, holidayParts.end[0].value);

        return holidayParts.end;
      }

      if (this.from[SELECTED_OPTION] === MORNING) {
        return holidayParts.end;
      } else if (this.from[SELECTED_OPTION] === EVENING) {
        return holidayParts.end.slice(1);
      }

      const hoursList = this.scheduleHoursList.map((item) => item.value);
      const hours = this.scheduleHoursList.filter(
        (hour, index) => index > hoursList.indexOf(this.from[SELECTED_OPTION]),
      );

      this.$set(this.to, SELECTED_OPTION, hours[0].value);

      return hours;
    },
    isDatepickerDisabled() {
      return this.from[SELECTED_OPTION] !== MORNING && this.from[SELECTED_OPTION] !== EVENING;
    },
  },
};
</script>

<style lang="scss"></style>
