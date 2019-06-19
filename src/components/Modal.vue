<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="bookModal">
    <div class="modal-dialog" role="document">
      <BookForm v-if="type === 'booking'" />

      <EventInfo v-else />
    </div>
  </div>
</template>

<script>
import BookForm from './BookForm';
import EventInfo from './EventInfo';

export default {
  name: 'Modal',
  props: {
    type: {
      required: true,
    },
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

  .form-group {
    label {
      display: block;
    }
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
