<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h3 class="modal-title">Holiday info</h3>
    </div>
    <div class="modal-body">
      <form action="#" @click.prevent="onClick" class="event-form">
        <div class="container" v-html="eventsInfo"></div>
      </form>
    </div>
  </div>
</template>

<script>
import { formatDateToString } from '../helpers/dateUtils';
import { holidayEvents, STATUS_PENDING, STATUS_APPROVED } from '../helpers/constants';

export default {
  name: 'EventInfo',
  props: {
    events: {
      required: true,
    },
  },
  methods: {
    async onClick(e) {
      const isEventBtn = e.target.matches('[data-toggle="modal"]');
      const cancelBtn = e.target.matches('[data-event-id]');
      const id = cancelBtn ? e.target.dataset.eventId : null;

      // if (isEventBtn) {
      //   this.$eventBus.$emit('showModal', {});
      // }

      if (!id) return;

      this.$eventBus.$emit('cancelEvent', id);
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
          status: event.status,
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
          const status = info.status === STATUS_PENDING[0] ? STATUS_PENDING[1] : STATUS_APPROVED[1];

          return `<div class="row">
            <div class="col-md-4">
              <div class="event-info">Holiday type:</div>
            </div>
            <div class="col-md-8">
              <div class="event-content">${type.split('_').join(' ')}</div>
            </div>
            ${
              info.status
                ? `<div class="col-md-4">
                    <div class="event-info">Holiday status:</div>
                  </div>
                  <div class="col-md-8">
                    <div class="event-content">${status}</div>
                  </div>`
                : ''
            }
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
          <div class="row">
            <div class="btn-wrap">
              <button type="button" class="btn btn-lg btn-success" data-toggle="modal">Add event</button>
              ${
                isCancellable
                  ? `<button type="submit" class="btn btn-lg btn-danger" data-event-id="${
                      info.id
                    }">Cancel holiday</button>`
                  : ''
              }
            </div>
          </div>
          ${divider}`;
        })
        .join('');
    },
  },
};
</script>

<style lang="scss">
.event-form {
  padding-bottom: 10px;

  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    .btn {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}
</style>
