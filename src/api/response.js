class Response {
  constructor(response) {
    this._origin = response;
    this._data = null;
    this._status = this._origin.status;
    this._success = this._status >= 200 && this._status < 300;
  }

  async getData() {
    const response = await this._origin.text();

    this._data = response ? JSON.parse(response) : null;

    return this._data;
  }

  isSuccess = () => this._success;
}

export default Response;
