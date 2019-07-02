import { Api } from './api';
import { URL_PLANNER } from './constants';

class Planner {
  async render() {
    return await Api.get(URL_PLANNER);
  }
}

export default new Planner();
