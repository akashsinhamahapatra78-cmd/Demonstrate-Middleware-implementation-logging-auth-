// Bearer Token Authentication Middleware
// This middleware validates the Authorization header and checks for the Bearer token

const SECRET_TOKEN = 'mysecrettoken';

const authToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Unauthorized: No Bearer token provided',
      hint: 'Please provide Bearer token in Authorization header'
    });
  }

  // Extract the Bearer token from the Authorization header
  // Expected format: "Bearer mysecrettoken"
  const parts = authHeader.split(' ');

  // Validate Bearer token format
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Unauthorized: Invalid token format',
      hint: 'Use format: Authorization: Bearer <token>'
    });
  }

  const token = parts[1];

  // Validate the token
  if (token !== SECRET_TOKEN) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Forbidden: Invalid Bearer token',
      hint: 'Token provided does not match expected value'
    });
  }

  // Store the token in the request object for later use
  req.token = token;

  // Token is valid, proceed to the next middleware or route handler
  next();
};

module.exports = authToken;
