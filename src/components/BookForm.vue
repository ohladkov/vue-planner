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
                <select v-model="holiday.selected" @change="onHolidayChange" class="form-control" name="type" id="type">
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
                    <label for="from">Starting</label>
                    <datepicker
                      v-model="from.date"
                      :mondayFirst="true"
                      @selected="onSelect"
                      format="D, dd MMM yy"
                      class="form-control"
                      name="from"
                      id="from"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="from-day-part">&nbsp;</label>
                    <select
                      v-model="from.selected"
                      @change="onChange"
                      class="form-control"
                      name="from-day-part"
                      id="from-day-part"
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
                    <label for="to">Ending</label>
                    <datepicker
                      v-model="to.date"
                      format="D, dd MMM yy"
                      :mondayFirst="true"
                      :disabledDates="disabledDates"
                      :disabled="isDatepickerDisabled"
                      class="form-control"
                      name="to"
                      id="to"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="to-day-part">&nbsp;</label>
                    <select v-model="to.selected" class="form-control" name="to-day-part" id="to-day-part">
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
        selected: holidayTypes[0],
        options: holidayTypes,
      },
      from: {
        date: new Date(),
        selected: holidayParts.start[0].value,
      },
      to: {
        date: new Date(),
        selected: holidayParts.end[0].value,
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

      this.from.selected = payload.period;
      this.to.selected = payload.period;

      this.disabledDates.to = new Date(payload.date);
    });
  },
  methods: {
    onSelect(date) {
      if (isBefore(this.to.date, date)) {
        this.to.date = new Date(date);
      }

      this.disabledDates.to = new Date(date);
    },
    onChange(e) {
      if (this.from.selected === MORNING || this.from.selected === EVENING) {
        this.to.selected = e.target.value;
      }
    },
    onHolidayChange() {
      if (this.holiday.selected !== DAY_OFF) {
        this.from.selected = this.startTimeList[0].value;
        this.to.selected = this.endTimeList[0].value;
      }
    },
  },
  computed: {
    scheduleHoursList() {
      const { schedule } = this.$props;
      const currentDay = getDayName(this.from.date).toLowerCase();

      if (isEmptyObject(schedule[currentDay])) {
        return [];
      }

      const startTime = schedule[currentDay] && schedule[currentDay].m.f;
      const endTime = schedule[currentDay] && schedule[currentDay].a.t;

      return createTimesList(startTime, endTime);
    },
    startTimeList() {
      if (!this.scheduleHoursList.length) {
        this.$set(this.from, 'selected', holidayParts.start[0].value);
        return holidayParts.start;
      }

      if (this.holiday.selected !== DAY_OFF) {
        return holidayParts.start;
      }

      return [...holidayParts.start, ...this.scheduleHoursList.slice(0, -1)];
    },
    endTimeList() {
      if (!this.scheduleHoursList.length) {
        this.$set(this.to, 'selected', holidayParts.end[0].value);

        return holidayParts.end;
      }

      if (this.from.selected === MORNING) {
        return holidayParts.end;
      } else if (this.from.selected === EVENING) {
        return holidayParts.end.slice(1);
      }

      const hoursList = this.scheduleHoursList.map((item) => item.value);
      const hours = this.scheduleHoursList.filter((hour, index) => index > hoursList.indexOf(this.from.selected));

      this.$set(this.to, 'selected', hours[0].value);

      return hours;
    },
    isDatepickerDisabled() {
      return this.from.selected !== MORNING && this.from.selected !== EVENING;
    },
  },
};
</script>

<style lang="scss"></style>
