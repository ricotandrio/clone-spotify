export class ResponseError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
