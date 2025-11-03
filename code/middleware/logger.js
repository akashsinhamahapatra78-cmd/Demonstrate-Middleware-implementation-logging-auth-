// Logging Middleware
// This middleware logs the HTTP method, request URL, and timestamp for every incoming request

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  // Log request details
  console.log(`\n[LOG] ${timestamp}`);
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  console.log(`IP: ${ip}`);
  console.log('---');

  // Call the next middleware or route handler
  next();
};

module.exports = logger;
