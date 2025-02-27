const globalErrorHandler = () => {
  let message = err.message || 'Internal Server Error';

  const statusCode = err.statusCode || 500;
};
