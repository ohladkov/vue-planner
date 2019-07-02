<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="bookModal">
    <div class="modal-dialog" role="document">
      <EventInfo 
        v-show="modalInfo.type === 'event'" 
        :events="modalInfo.events" 
      />

      <BookForm 
        v-show="modalInfo.type !== 'event'" 
        :schedule="schedule" 
      />
    </div>
  </div>
</template>

<script>
import BookForm from './BookForm';
import EventInfo from './EventInfo';

export default {
  name: 'Modal',
  props: {
    schedule: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      modalInfo: {},
    };
  },
  mounted() {
    this.$eventBus.$on('showModal', (payload) => {
      this.modalInfo = payload;
    });
  },
  components: {
    BookForm,
    EventInfo,
  },
};
</script>

<style lang="scss">
.planner {
  .modal {
    .container {
      max-width: 100%;
    }
  }

  .modal-dialog {
    text-align: left;

    @media screen and (min-width: 768px) {
      width: 740px;
    }
  }

  .modal-title {
    text-align: center;
  }

  .vdp-datepicker {
    padding: 0;

    input {
      width: 100%;
      padding: 6px 12px;
      border: 0;
      border-radius: 4px;

      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
      }
    }
  }

  select.form-control {
    text-transform: capitalize;
  }

  textarea.form-control {
    min-height: 34px;
    resize: vertical;
  }

  .event-info,
  .event-content {
    font-size: 20px;
  }
  .event-info {
    font-weight: bold;
  }
  .event-content {
    font-style: italic;
  }
}
</style>
