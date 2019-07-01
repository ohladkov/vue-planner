<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h3 class="modal-title">Holiday info</h3>
    </div>
    <div class="modal-body">
      <form action="#" class="event-form">
        <div class="container" v-html="eventsInfo"></div>
      </form>
    </div>
  </div>
</template>

<script>
import { formatDateToString } from '../helpers/dateUtils';
import { holidayEvents } from '../helpers/constants';

export default {
  name: 'EventInfo',
  props: {
    events: {
      required: true,
    },
  },
  computed: {
    eventsInfo() {
      const { events } = this.$props;

      if (!events || !events.length) return;

      const eventsInfo = {};

      events.forEach((event) => {
        eventsInfo[event.type] = {
          id: event.id,
          fromDate: `${event.date_from}`,
          fromTime: `${event.time_from || ''}`,
          toDate: `${event.date_to}`,
          toTime: `${event.time_to || ''}`,
        };
      });

      return Object.entries(eventsInfo)
        .map((event, index) => {
          const [type, info] = event;
          const isCancellable = holidayEvents.includes(type);
          const divider = index < events.length - 1 ? '<hr>' : '';

          return `<div class="row">
            <div class="col-md-4">
              <div class="event-info">Holiday type:</div>
            </div>
            <div class="col-md-8">
              <div class="event-content">${type.split('_').join(' ')}</div>
            </div>
            <div class="col-md-4">
              <div class="event-info">Holiday duration:</div>
            </div>
            <div class="col-md-8">
              <div class="event-content">
                <strong>${formatDateToString(info.fromDate, info.fromTime)}</strong>
                to
                <strong>${formatDateToString(info.toDate, info.toTime)}</strong>
              </div>
            </div>
          </div>
          ${
            isCancellable
              ? `<button type="submit" class="btn btn-lg btn-danger" data-event-id="${info.id}">Cancel holiday</button>`
              : ''
          }${divider}`;
        })
        .join('');
    },
  },
};
</script>

<style lang="scss">
.event-form {
  padding-bottom: 10px;

  .btn[type='submit'] {
    display: block;
    margin-top: 10px;
    margin-left: auto;
  }
}
</style>
