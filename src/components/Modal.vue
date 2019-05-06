<template>
  <div class="modal">
    <div class="modal-box">
      <button type="button" class="modal-close">&nbsp;</button>

      <div class="title">
        Book time off
      </div>

      <div class="book-form-wrapper">
        <form @submit.prevent="onSubmit" action="#" autocomplete="off" class="book-form">
          <div class="book-form__inner">
            <div class="book-form__row-wrapper">
              <div class="book-form__row">
                <label for="book-type">Type</label>
                <select name="book-type" id="book-type" v-model="formData.bookTypeSelected">
                  <option v-for="option in formData.bookType" :key="option" :value="option">{{ option }}</option>
                </select>
              </div>
            </div>

            <div class="book-form__row-wrapper">
              <div class="book-form__row">
                <label for="book-from">Starting</label>
                <input type="text" name="book-from" id="book-from" v-model="formData.from" />
                <select name="book-fromDayPart" id="book-fromDayPart" v-model="formData.fromDayPartSelected">
                  <option v-for="option in formData.fromDayPart" :key="'from: ' + option.value" :value="option.value">{{
                    option.text
                  }}</option>
                </select>
              </div>
              <div class="book-form__row">
                <label for="book-to">Ending</label>
                <input type="text" name="book-to" id="book-to" v-model="formData.to" />
                <select name="book-toDayPart" id="book-toDayPart" v-model="formData.toDayPartSelected">
                  <option v-for="option in formData.toDayPart" :key="'to: ' + option.value" :value="option.value">{{
                    option.text
                  }}</option>
                </select>
              </div>
            </div>

            <div class="book-form-wrapper">
              <div class="book-form__row">
                <label for="reason">Reason (Required)</label>
                <textarea
                  name="reason"
                  id="reason"
                  placeholder="Reason for time off..."
                  v-model="formData.reason"
                ></textarea>
              </div>
            </div>

            <button type="submit" class="book-submit">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    bookData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        bookType: ['holiday', 'day-off', 'sickness'],
        bookTypeSelected: 'holiday',
        from: '',
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
        fromDayPartSelected: 'PM',
        to: '',
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
  &-wrapper {
  }

  &__row-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
