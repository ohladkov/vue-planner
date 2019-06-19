<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h3 class="modal-title">Holiday</h3>
    </div>
    <div class="modal-body">
      <form action="#" id="event-form">
        <input type="hidden" name="event-id" value="1">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="event-info">Event duration:</div>
            </div>
            <div class="col-md-9">
              <div class="event-content">
                <strong>Tue 25-Jun-19 09:00</strong>
                to
                <strong>Fri 5-Jul-19 12:00</strong>
              </div>
            </div>
            <div class="col-md-3">
              <div class="event-info">Booked:</div>
            </div>
            <div class="col-md-9">
              <div class="event-content">18 Jun, 11:49 – Oleh Hladkov</div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" form="event-form" class="btn btn-lg btn-danger">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventInfo',
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
