import { Api } from './api';
import { URL_BOOK_EVENT, URL_CANCEL_EVENT } from './constants';

class Event {
  async book(data) {
    const response = await Api.post(URL_BOOK_EVENT, data);

    return response.isSuccess();
  }

  async cancel(eventId) {
    const response = await Api.get(`${URL_CANCEL_EVENT}=${eventId}`);

    return response.isSuccess();
  }
}

export default new Event();
