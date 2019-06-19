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
                <select class="form-control" id="type">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row">
                <div class="col-md-7">
                  <div class="form-group">
                    <label for="from">Starting</label>
                    <input class="form-control" type="text" id="from" placeholder="From" />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="from-day-part">&nbsp;</label>
                    <select class="form-control" id="from-day-part">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
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
                    <input class="form-control" type="text" id="to" placeholder="To" />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="to-day-part">&nbsp;</label>
                    <select class="form-control" id="to-day-part">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for="reason">Reason</label>
                <textarea class="form-control" id="reason" rows="3" placeholder="Reason for time of..."></textarea>
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
export default {
  name: 'BookForm',
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
