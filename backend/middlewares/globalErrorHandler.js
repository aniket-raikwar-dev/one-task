// manage all the global error
const globalErrorHandler = (err, req, res, next) => {
  const { status = "failed", statusCode = 500, message, stack } = err;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

module.exports = globalErrorHandler;
