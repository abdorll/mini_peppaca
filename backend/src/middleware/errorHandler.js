export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong'
  };

  // Supabase specific errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        error.error = 'Duplicate entry';
        error.message = 'A record with this information already exists';
        return res.status(409).json(error);
      
      case '23503': // Foreign key violation
        error.error = 'Invalid reference';
        error.message = 'Referenced record does not exist';
        return res.status(400).json(error);
      
      case '23502': // Not null violation
        error.error = 'Missing required field';
        error.message = 'Required field cannot be empty';
        return res.status(400).json(error);
      
      case 'PGRST116': // No rows found
        error.error = 'Not found';
        error.message = 'Requested resource not found';
        return res.status(404).json(error);
    }
  }

  // GraphQL errors
  if (err.extensions) {
    return res.status(400).json({
      success: false,
      error: 'GraphQL Error',
      message: err.message,
      details: err.extensions
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.error = 'Validation Error';
    error.message = err.message;
    return res.status(400).json(error);
  }

  // Default to 500 server error
  res.status(500).json(error);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};