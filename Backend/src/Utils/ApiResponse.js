class ApiResponse {
  constructor(statusCode, data, message = "Success", extra = {}) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    Object.assign(this, extra);
  }
}
export default ApiResponse