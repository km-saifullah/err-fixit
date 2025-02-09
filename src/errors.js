//  handle duplicate key errors | MongoDB
function handleDuplicateKeyError(error) {
  const field = Object.keys(error.keyValue)[0];
  return {
    status: false,
    message: `'${field}' must be unique`,
    field: field,
    errorCode: 11000,
  };
}

//  handle Cast Errors | Invalid ObjectId etc.
function handleCastError(error) {
  return {
    status: false,
    message: `invalid value provided for field '${error.path}'`,
    field: error.path,
    errorCode: 400,
  };
}

// handle validation errors
function handleValidationError(error) {
  const errors = Object.values(error.errors).map((err) => ({
    field: err.path,
    message: err.message,
  }));
  return {
    status: false,
    message: "validation failed",
    errors: errors,
    errorCode: 400,
  };
}

// handle unknown errors
function handleUnknownError(error) {
  return {
    status: false,
    message: error.message || "an unknown error occurred",
    errorCode: 500,
  };
}

//  handle all errors
function errorHandler(error) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    return handleDuplicateKeyError(error);
  } else if (error.name === "CastError") {
    return handleCastError(error);
  } else if (error.name === "ValidationError") {
    return handleValidationError(error);
  } else {
    return handleUnknownError(error);
  }
}

module.exports = { errorHandler };
