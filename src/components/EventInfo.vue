<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h3 class="modal-title">Holiday info</h3>
    </div>
    <div class="modal-body">
      <form action="#" id="event-form">
        <input type="hidden" name="event-id" />
        <div class="container" v-html="eventsInfo"></div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" form="event-form" class="btn btn-lg btn-danger">Cancel holiday</button>
    </div>
  </div>
</template>

<script>
import { formatDateToString } from '../helpers/dateUtils';

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
          from: `${event.date_from} ${event.time_from}`,
          to: `${event.date_to} ${event.time_to}`,
        };
      });

      return Object.entries(eventsInfo)
        .map(
          (event) =>
            `<div class="row">
            <div class="col-md-3">
              <div class="event-info">Event type:</div>
            </div>
            <div class="col-md-9">
              <div class="event-content">${event[0].split('_').join(' ')}</div>
            </div>
            <div class="col-md-3">
              <div class="event-info">Event duration:</div>
            </div>
            <div class="col-md-9">
              <div class="event-content">
                <strong>${formatDateToString(event[1].from)}</strong>
                to
                <strong>${formatDateToString(event[1].to)}</strong>
              </div>
            </div>
          </div>`,
        )
        .join('');
    },
  },
};
</script>

<style lang="scss"></style>
