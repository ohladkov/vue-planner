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
                <select v-model="holiday.selected" @change="onChange" class="form-control" name="type" id="type">
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
                    <select v-model="from.selected" class="form-control" name="from-day-part" id="from-day-part">
                      <option v-for="option in from.hours" :key="option" :value="option">
                        {{ option }}
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
                      <option v-for="option in to.hours" :key="option" :value="option">
                        {{ option }}
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
import { isBefore, createTimesList } from '../helpers/dateUtils';

export default {
  name: 'BookForm',
  components: {
    Datepicker,
  },
  data() {
    return {
      holiday: {
        selected: 'holiday',
        options: ['holiday', 'day_off', 'sickness'],
      },
      from: {
        date: new Date().toDateString(),
        selected: 'morning',
        hours: ['morning', 'evening'],
      },
      to: {
        date: new Date().toDateString(),
        selected: 'morning',
        hours: ['morning', 'evening'],
      },
      disabledDates: {
        to: new Date(),
      },
      reason: '',
      dayOffHours: [],
    };
  },
  created() {
    this.$eventBus.$on('showModal', (payload) => {
      this.from.date = payload.date;
      this.to.date = payload.date;

      this.from.selected = payload.period;

      this.disabledDates.to = new Date(payload.date);
    });

    this.dayOffHours = [...createTimesList('10:00', '19-00')];
  },
  methods: {
    onChange(e) {
      const { value } = e.target;

      if (value === 'day_off') {
        this.from.hours = [...this.from.hours, ...this.dayOffHours];
        return;
      }

      if (this.from.hours.length > 2) {
        this.from.hours = this.from.hours.splice(0, 2);
        this.from.selected = 'morning';
      }
    },
    onSelect(date) {
      if (isBefore(this.to.date, date)) {
        this.to.date = new Date(date);
      }

      this.disabledDates.to = new Date(date);
    },
  },
};
</script>

<style lang="scss"></style>
