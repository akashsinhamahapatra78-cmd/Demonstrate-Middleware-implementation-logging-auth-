# Demonstrate Middleware Implementation (Logging & Authentication)

## Project Overview

This project demonstrates how to build and integrate custom middleware functions in an Express.js application. It showcases:

1. **Request Logging Middleware** - Logs HTTP method, request URL, and timestamp for all incoming requests
2. **Bearer Token Authentication Middleware** - Protects routes using Bearer token validation

## Objective

Learn how to:
- Build custom middleware functions in Express.js
- Handle request validation and logging
- Enforce secure access to endpoints using Bearer tokens
- Implement middleware flow and routing

## Project Structure

```
Demonstrate-Middleware-implementation-logging-auth/
├── code/
│   ├── app.js              # Main Express server
│   ├── package.json        # Project dependencies
│   └── middleware/
│       ├── logger.js       # Logging middleware
│       └── authToken.js    # Bearer token authentication middleware
├── README.md               # Project documentation
└── .gitignore             # Git ignore file
```

## Features

### 1. Logging Middleware
- Logs every incoming request
- Captures: HTTP method, request URL, and timestamp
- Applied globally to all routes

### 2. Bearer Token Authentication Middleware
- Validates Authorization header
- Checks for Bearer token: `mysecrettoken`
- Denies requests without valid token with 401 Unauthorized

### 3. Routes
- **Public Route** (`GET /public`) - Accessible without authentication
- **Protected Route** (`GET /protected`) - Requires Bearer token authentication
- **Health Check** (`GET /`) - Server status endpoint

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/Demonstrate-Middleware-implementation-logging-auth.git
cd Demonstrate-Middleware-implementation-logging-auth
```

2. Navigate to code directory:
```bash
cd code
```

3. Install dependencies:
```bash
npm install
```

## Running the Server

```bash
node app.js
```

The server will start on `http://localhost:3000`

## Testing with curl

### 1. Test Public Route (No Authentication Required)
```bash
curl -X GET http://localhost:3000/public
```

**Expected Response:**
```json
{
  "message": "This is a public route, accessible to everyone"
}
```

### 2. Test Protected Route Without Token (Should Fail)
```bash
curl -X GET http://localhost:3000/protected
```

**Expected Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No Bearer token provided"
}
```

### 3. Test Protected Route With Invalid Token (Should Fail)
```bash
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer invalidtoken"
```

**Expected Response (403 Forbidden):**
```json
{
  "error": "Forbidden: Invalid Bearer token"
}
```

### 4. Test Protected Route With Valid Token (Should Succeed)
```bash
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer mysecrettoken"
```

**Expected Response (200 OK):**
```json
{
  "message": "This is a protected route, accessed with valid Bearer token",
  "token": "mysecrettoken"
}
```

### 5. Test Health Check Route
```bash
curl -X GET http://localhost:3000/
```

**Expected Response:**
```json
{
  "status": "Server is running"
}
```

## Testing with Postman

1. **Open Postman** and create a new request

2. **For Public Route:**
   - Method: GET
   - URL: `http://localhost:3000/public`
   - Headers: None required
   - Click Send

3. **For Protected Route (with valid token):**
   - Method: GET
   - URL: `http://localhost:3000/protected`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer mysecrettoken`
   - Click Send

4. **For Protected Route (without token):**
   - Method: GET
   - URL: `http://localhost:3000/protected`
   - Headers: None
   - Click Send (will receive 401 error)

## Middleware Explanation

### Logging Middleware (logger.js)
- Executed first for every request
- Logs request details with timestamp
- Uses console.log for demonstration
- Can be extended to write to files or databases

### Authentication Middleware (authToken.js)
- Checks Authorization header
- Extracts Bearer token from header
- Validates token against `mysecrettoken`
- Passes control to next middleware/route if valid
- Returns error response if invalid

## Code Example

### Basic Express Server Setup
```javascript
const express = require('express');
const app = express();

// Middleware
const logger = require('./middleware/logger');
const authToken = require('./middleware/authToken');

// Apply logging middleware globally
app.use(logger);

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// Protected route
app.get('/protected', authToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Key Concepts

- **Middleware**: Functions that execute during the request-response cycle
- **Request Logging**: Tracking incoming requests for debugging and monitoring
- **Bearer Token**: A security token used for API authentication
- **Middleware Chain**: Multiple middlewares executed in sequence

## Learning Outcomes

After completing this project, you will understand:
1. How to create custom middleware functions
2. How to apply middleware globally or selectively to routes
3. How to validate requests using middleware
4. How to implement Bearer token authentication
5. Best practices for request logging and security

## Dependencies

- **express** - Web framework for Node.js

## License

MIT License

## Author

Created as a learning project for middleware implementation in Express.js
