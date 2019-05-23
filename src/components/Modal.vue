<template>
  <div class="modal">
    <div class="modal-box">
      <button type="button" class="modal-close">&nbsp;</button>

      <div class="book-form-wrapper" v-if="modalData.type !== 'book-info'">
        <div class="title">
          Book time off
        </div>

        <form @submit.prevent="onSubmit" action="#" autocomplete="off" class="book-form">
          <div class="book-form__inner">
            <div class="book-form__row-wrapper">
              <div class="book-form__row">
                <label for="book-type">Type</label>
                <select name="book-type" id="book-type" v-model="bookForm.bookTypeSelected">
                  <option v-for="option in bookForm.bookType" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
            </div>

            <div class="book-form__row-wrapper">
              <div class="book-form__row">
                <label for="book-from">Starting</label>

                <datepicker
                  v-model="bookForm.from"
                  format="D, dd MMM yy"
                  :mondayFirst="true"
                  :disabledDates="bookForm.fromDisabledDates"
                  @selected="onSelect"
                  name="book-from"
                  id="book-from"
                >
                </datepicker>

                <select name="book-fromDayPart" id="book-fromDayPart" v-model="bookForm.fromDayPartSelected">
                  <option v-for="option in bookForm.fromDayPart" :key="`from-${option.text}`" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </div>
              <div class="book-form__row">
                <label for="book-to" ref="toDateLabel">Ending</label>

                <datepicker
                  v-model="bookForm.to"
                  format="D, dd MMM yy"
                  :mondayFirst="true"
                  :disabledDates="bookForm.toDisabledDates"
                  name="book-to"
                  id="book-to"
                >
                </datepicker>

                <select name="book-toDayPart" id="book-toDayPart" v-model="bookForm.toDayPartSelected">
                  <option v-for="option in bookForm.toDayPart" :key="`to-${option.text}`" :value="option.value">{{
                    option.text
                  }}</option>
                </select>
              </div>
            </div>

            <div class="book-form-wrapper">
              <div class="book-form__row">
                <label for="reason">Reason (Required)</label>
                <textarea
                  v-model="bookForm.reason"
                  name="reason"
                  placeholder="Reason for time off..."
                  id="reason"
                ></textarea>
              </div>
            </div>

            <button type="submit" class="book-submit">Send Request</button>
          </div>
        </form>
      </div>

      <div class="booking-info" v-else>
        <div>Type: {{modalData.bookingContent.type}}</div>
        <div>Date: {{modalData.bookingContent.date}}</div>
        <div>BookedDate: {{modalData.bookingContent.bookedDate}}</div>

        <button type="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import { getCurrentDate } from '../helpers/date';

export default {
  name: 'Modal',
  props: {
    modalData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentDate: getCurrentDate(),
      bookForm: {
        bookType: ['holiday', 'day-off', 'sickness'],
        bookTypeSelected: 'holiday',
        from: moment(getCurrentDate()).toDate(),
        fromDisabledDates: {
          to: moment(getCurrentDate()).toDate(),
        },
        fromDayPart: [
          {
            value: 'AM',
            text: 'morning',
          },
          {
            value: 'PM',
            text: 'afternoon',
          },
        ],
        fromDayPartSelected: 'AM',
        to: moment(getCurrentDate()).toDate(),
        toDisabledDates: {
          to: moment(getCurrentDate()).toDate(),
        },
        toDayPart: [
          {
            value: 'AM',
            text: 'lunch-time',
          },
          {
            value: 'PM',
            text: 'end-of-day',
          },
        ],
        toDayPartSelected: 'AM',
        reason: '',
      },
    };
  },
  methods: {
    onSubmit(e) {
      const formData = new FormData(e.target);

      for (let pair of formData.entries()) {
        // eslint-disable-next-line
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    },
    onSelect(date) {
      if (moment(date).isBefore(this.bookForm.to)) {
        return;
      }

      this.bookForm.to = date;

      this.bookForm.toDisabledDates = {
        to: date,
      };
    },
  },
  watch: {
    modalData(newVal) {
      if (moment(newVal.from).isBefore(this.currentDate)) {
        return;
      }

      this.bookForm.from = moment(newVal.from).toDate();
      this.bookForm.to = moment(newVal.to).toDate();

      this.bookForm.fromDayPartSelected = newVal.fromDayPart;
      this.bookForm.toDayPartSelected = newVal.toDayPart;
    },
  },
  components: {
    Datepicker,
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 30px;
  color: #2c2c2c;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;

  .modal-open & {
    opacity: 1;
    pointer-events: auto;

    .modal-box {
      transform: translate3d(0, 0, 0);
    }
  }

  &-box {
    position: relative;
    width: 600px;
    min-height: 500px;
    margin: auto;
    padding: 25px 30px;
    text-align: left;
    border-radius: 3px;
    background-color: #f7f7f7;
    transform: translate3d(0, 50px, 0);
    transition: transform 0.3s;
  }

  &-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border: 0;
    background-color: transparent;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iIzc0NzQ3OCI+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMzQwLjIsMTYwIDI1NS44LDI0NC4zIDE3MS44LDE2MC40IDE2MCwxNzIuMiAyNDQsMjU2IDE2MCwzMzkuOSAxNzEuOCwzNTEuNiAyNTUuOCwyNjcuOCAzNDAuMiwzNTIKMzUyLDM0MC4zIDI2Ny42LDI1NiAzNTIsMTcxLjggIi8+Cjwvc3ZnPg==');
    background-position: center;
    cursor: pointer;
  }

  .title {
    margin-bottom: 30px;
    font-size: 34px;
    color: #862c50;
  }
}

.book-form {
  &__row-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 46%;
    width: 100%;
    margin-bottom: 20px;

    &:only-of-type {
      max-width: 100%;
    }

    label {
      width: 100%;
      margin-bottom: 5px;
    }

    select {
      max-width: 46%;
      width: 100%;
    }
  }

  textarea {
    width: 100%;
    height: 40px;
    padding: 10px 20px 0px 0;
    font-size: 16px;
    line-height: normal;
    border: 0;
    border-bottom: 1px solid #000;
    background-color: transparent;
    resize: none;

    &::placeholder {
      font-style: italic;
    }
  }
}
</style>
