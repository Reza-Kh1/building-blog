const globalHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const message = err?.message;
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  res.status(statusCode).json({
    stack,
    message,
  });
};
const customError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  delete error.stack
  return error;
};
const notFound = (req, res, next) => {
  return res.status(404).send(`Route ${req.originalUrl} Not Found`);
};
module.exports = {
  globalHandler,
  customError,
  notFound,
};