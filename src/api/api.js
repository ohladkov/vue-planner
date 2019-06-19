import Response from './response';
import config from '../config';

class Api {
  constructor() {
    if (!Api.instance) {
      Api.instance = this;
    }

    this.defaultHeaders = { Accept: 'application/json' };
    this.headers = new Headers(this.defaultHeaders);
  }

  getHeaders = () => this.headers;

  setHeader = (header, value) => {
    this.headers.append(header, value);
  };

  async request(path, method) {
    const url = `${config.baseUrl}${path}`;
    const options = {
      method,
      headers: this.getHeaders(),
    };

    const response = await fetch(url, options);

    return new Response(response);
  }

  async post(path, data = {}) {
    return this.request(path, 'POST', data);
  }

  async get(path) {
    return this.request(path, 'GET');
  }
}

const instance = new Api();
Object.freeze(instance);

export { instance as Api };
