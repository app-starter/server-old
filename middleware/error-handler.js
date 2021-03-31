class ErrorHandler extends Error {
  constructor(statusCode, message, errors) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

const handleError = (err, res) => {
  const { statusCode, message, errors } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    errors,
  });
};
module.exports = {
  ErrorHandler,
  handleError,
};
