# Demonstrate Middleware Implementation & JWT Authentication for Banking

## Repository Overview

This repository contains two comprehensive Express.js projects that demonstrate essential concepts in modern web development:

1. **Logging & Authentication Middleware** - Basic middleware implementation with request logging and Bearer token authentication
2. **JWT Authentication for Secure Banking API** - Advanced authentication using JSON Web Tokens with protected banking endpoints

## Projects in This Repository

### 1. Logging & Authentication Middleware (`/code` folder)

**Objective**: Learn how to build and integrate custom middleware functions in an Express.js application.

**Features**:
- **Request Logging Middleware** - Logs HTTP method, request URL, and timestamp for all incoming requests
- **Bearer Token Authentication Middleware** - Protects routes using Bearer token validation
- Public and protected routes demonstration
- Global and selective middleware application

**Project Structure**:
```
code/
├── app.js                    # Main Express server
├── package.json              # Project dependencies
└── middleware/
    ├── logger.js             # Logging middleware
    └── authToken.js          # Bearer token authentication middleware
```

**Key Concepts**:
- Middleware functions and their role in the request-response cycle
- Request logging for debugging and monitoring
- Bearer token validation for authentication
- Middleware chaining and execution flow

**Installation & Running**:
```bash
cd code
npm install
node app.js
```

**Learning Outcomes**:
- How to create custom middleware functions
- How to apply middleware globally or selectively to routes
- How to validate requests using middleware
- How to implement Bearer token authentication
- Best practices for request logging and security

---

### 2. JWT Authentication for Secure Banking API (`/banking-jwt-auth-demo` folder)

**Objective**: Learn how to implement secure authentication in an Express.js application using JSON Web Tokens (JWT). Understand how to generate tokens, verify them in middleware, and protect sensitive API routes.

**Features**:
- **JWT Token Generation** - `/login` endpoint generates signed tokens with 1-hour expiration
- **Protected Banking Endpoints**:
  - `GET /balance` - View current account balance
  - `POST /deposit` - Deposit money to the account
  - `POST /withdraw` - Withdraw money from the account
- **JWT Verification Middleware** - Validates Bearer tokens before accessing protected routes
- **Error Handling** - Missing/invalid tokens, insufficient balance, input validation
- **Security Features** - Token expiration, secure token verification, comprehensive error messages

**Project Structure**:
```
banking-jwt-auth-demo/
├── server.js                 # Main Express server with all endpoints
├── package.json              # Project dependencies
└── README.md                 # Comprehensive project documentation
```

**Demo Credentials**:
- Username: `user`
- Password: `pass`
- Initial Balance: $5000

**Installation & Running**:
```bash
cd banking-jwt-auth-demo
npm install
node server.js
```

**Quick Test Example**:

1. Login to get a token:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "pass"}'
```

2. Use the token to check balance:
```bash
curl -X GET http://localhost:3000/balance \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

3. Deposit money:
```bash
curl -X POST http://localhost:3000/deposit \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"amount": 500}'
```

**Learning Outcomes**:
- How to generate and sign JWT tokens
- How to verify tokens in middleware
- How to extract and validate Bearer tokens from headers
- How to protect routes using authentication middleware
- How to handle authentication errors appropriately
- Best practices for token-based authentication
- Common error handling scenarios (missing tokens, invalid credentials, insufficient balance)

**Key Concepts**:
- **JWT (JSON Web Token)** - Self-contained token format for secure information transmission
- **Bearer Token** - Standard way to transmit JWT tokens in HTTP Authorization header
- **Token Expiration** - Security measure to limit token validity duration
- **Middleware Authentication** - Functions that verify tokens before allowing access to routes
- **Hardcoded Credentials** - Used for learning; production systems should use secure databases with password hashing

---

## General Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Clone Repository
```bash
git clone https://github.com/akashsinhamahapatra78-cmd/Demonstrate-Middleware-implementation-logging-auth-.git
cd Demonstrate-Middleware-implementation-logging-auth-
```

## Running Both Projects

**Project 1 - Logging & Authentication Middleware**:
```bash
cd code
npm install
node app.js
# Server runs on http://localhost:3000
```

**Project 2 - JWT Banking API**:
```bash
cd banking-jwt-auth-demo
npm install
node server.js
# Server runs on http://localhost:3000
```

*Note: Run each project in a separate terminal as they both use port 3000*

## Testing Tools

### Using curl (Command Line)
Perfect for quick testing of API endpoints from the terminal.

### Using Postman
Excellent for interactive API testing with a visual interface:
- Set up requests with custom headers
- Save request collections
- Test different scenarios easily
- View formatted JSON responses

Both projects include detailed testing examples in their respective README.md files.

## Comparison of Projects

| Feature | Middleware Demo | JWT Banking API |
|---------|-----------------|------------------|
| Complexity | Beginner | Intermediate |
| Token Type | Simple Bearer | JWT (Signed) |
| Endpoints | 3 (public/protected/health) | 5 (login, balance, deposit, withdraw, health) |
| Auth Mechanism | Static token | JWT Generation & Verification |
| Token Expiration | No | 1 hour |
| Business Logic | No | Banking operations |
| Error Handling | Basic | Comprehensive |
| Learning Focus | Middleware fundamentals | Secure token authentication |

## Security Considerations

### For Learning Projects
These projects use simplified security for educational purposes:
- Hardcoded credentials
- Secret keys in plaintext
- In-memory data storage
- No input sanitization

### For Production Deployment
⚠️ **Never use these implementations in production. Instead:**
- Use secure password hashing (bcrypt)
- Store secrets in environment variables
- Implement HTTPS/TLS encryption
- Use a real database
- Add rate limiting and brute-force protection
- Implement token refresh mechanisms
- Add comprehensive logging and monitoring
- Perform regular security audits
- Keep dependencies updated
- Implement CORS and CSRF protection

## Dependencies

### Both Projects
- **express** (^4.18.2) - Web framework for Node.js
- **nodemon** (^2.0.22) - Auto-restart server during development

### JWT Banking API Only
- **jsonwebtoken** (^9.0.0) - JWT token generation and verification

## Learning Path

### Beginner
1. Start with the **Logging & Authentication Middleware** project
2. Understand how middleware works
3. Learn Bearer token basics
4. Practice with curl commands

### Intermediate
1. Move to the **JWT Banking API** project
2. Understand JWT token structure and signing
3. Learn token verification and expiration
4. Build more complex API endpoints
5. Handle various error scenarios

### Advanced
Extend either project with:
- Database integration (MongoDB, PostgreSQL)
- Password hashing (bcrypt)
- Refresh token implementation
- Role-based access control (RBAC)
- API rate limiting
- Comprehensive logging
- OpenAPI/Swagger documentation

## Project URLs

- **Repository**: https://github.com/akashsinhamahapatra78-cmd/Demonstrate-Middleware-implementation-logging-auth-
- **Middleware Demo**: `/code/README.md`
- **JWT Banking API**: `/banking-jwt-auth-demo/README.md`

## File Tree

```
Demonstrate-Middleware-implementation-logging-auth-/
├── code/
│   ├── app.js                    # Main Express server (Middleware Demo)
│   ├── package.json              # Dependencies for Middleware Demo
│   └── middleware/
│       ├── logger.js             # Logging middleware
│       └── authToken.js          # Bearer token authentication
├── banking-jwt-auth-demo/
│   ├── server.js                 # Main Express server (JWT Banking API)
│   ├── package.json              # Dependencies for JWT Banking API
│   └── README.md                 # JWT Banking API documentation
├── README.md                      # This file - Repository overview
└── .gitignore                     # Git ignore file
```

## Deployment Options

### Local Testing
```bash
node app.js          # For Middleware Demo
node server.js       # For JWT Banking API
```

### Development with Auto-Reload
```bash
npm run dev          # Both projects have nodemon configured
```

### Cloud Deployment
These projects can be deployed to:
- Heroku
- AWS EC2
- Google Cloud Platform
- DigitalOcean
- Azure

## Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Module Not Found
```bash
# Ensure you're in the correct directory
cd code  # or cd banking-jwt-auth-demo

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Invalid Token Errors
- Ensure the Authorization header format is correct: `Bearer <token>`
- Check that the token hasn't expired (JWT Banking API expires after 1 hour)
- Verify you're using the correct token from login

## Contributing

Feel free to fork this repository and enhance these projects with:
- Additional middleware examples
- More banking operations
- Enhanced error handling
- Better documentation
- Unit tests
- Performance optimizations

## License

MIT License - Feel free to use these projects for learning and as a foundation for your applications.

## Author

Created as comprehensive learning projects for middleware implementation and JWT authentication in Express.js

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Node.js Documentation](https://nodejs.org/docs/)
- [RESTful API Best Practices](https://restfulapi.net/)
- [Security Best Practices](https://owasp.org/)

---

**Last Updated**: November 3, 2025
