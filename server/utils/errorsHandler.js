const { HttpStatusCode } = require("./httpStatusCodes");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: Object.keys(HttpStatusCode).find(key => HttpStatusCode[key] === statusCode),
    statusCode,
    message
  });
};
module.exports = {
  ErrorHandler,
  handleError
}