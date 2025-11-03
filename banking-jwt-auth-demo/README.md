# JWT Authentication for Secure Banking API Endpoints

## Project Overview

This project demonstrates a secure Express.js banking API that implements JWT (JSON Web Token) authentication. It showcases how to:

- Generate JWT tokens upon user login
- Verify JWT tokens in middleware to protect sensitive routes
- Implement secure banking operations (balance checking, deposits, withdrawals)
- Handle authentication errors and validation
- Enforce access control using Bearer tokens

## Objective

Learn how to implement secure authentication in an Express.js application using JSON Web Tokens (JWT). This helps you understand how to:

- Generate signed tokens with expiration
- Verify tokens in middleware before allowing access to protected routes
- Protect sensitive API routes
- Ensure only authorized users can access banking operations
- Handle common authentication errors gracefully

## Features

### 1. Authentication Endpoint
- **POST /login** - Authenticates user with username and password, returns JWT token valid for 1 hour

### 2. Protected Banking Endpoints
- **GET /balance** - View current account balance (JWT-protected)
- **POST /deposit** - Deposit money to the account (JWT-protected)
- **POST /withdraw** - Withdraw money from the account (JWT-protected)

### 3. Security Features
- Bearer token validation in Authorization header
- JWT token expiration (1 hour)
- Error handling for missing/invalid tokens
- Insufficient balance validation
- Input validation for deposit/withdraw amounts

### 4. Other Routes
- **GET /** - Health check endpoint

## Project Structure

```
banking-jwt-auth-demo/
├── server.js           # Main Express server with all endpoints
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Steps

1. Navigate to the banking-jwt-auth-demo folder:
```bash
cd banking-jwt-auth-demo
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the banking API server:
```bash
node server.js
```

Or with nodemon for development:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

**Output:**
```
Banking API server running on http://localhost:3000
Current account balance: $5000

Demo Credentials:
Username: user
Password: pass
```

## Authentication Flow

1. **Login**: Send credentials to `/login` endpoint
2. **Receive Token**: Get JWT token in response
3. **Use Token**: Include token in Authorization header as `Bearer <token>`
4. **Access Protected Routes**: Successfully access banking endpoints

## Testing with curl

### 1. Login and Get Token

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "pass"}'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1 hour"
}
```

### 2. Test Protected Route Without Token (Should Fail)

```bash
curl -X GET http://localhost:3000/balance
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No Bearer token provided"
}
```

### 3. Test Protected Route With Invalid Token (Should Fail)

```bash
curl -X GET http://localhost:3000/balance \
  -H "Authorization: Bearer invalidtoken"
```

**Response (403 Forbidden):**
```json
{
  "error": "Forbidden: Invalid or expired Bearer token"
}
```

### 4. Check Balance With Valid Token (Should Succeed)

First, get a valid token from the login endpoint, then:

```bash
curl -X GET http://localhost:3000/balance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response (200 OK):**
```json
{
  "message": "Balance retrieved successfully",
  "username": "user",
  "balance": 5000,
  "currency": "USD"
}
```

### 5. Deposit Money

```bash
curl -X POST http://localhost:3000/deposit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"amount": 500}'
```

**Response:**
```json
{
  "message": "Deposit successful",
  "username": "user",
  "depositAmount": 500,
  "newBalance": 5500,
  "currency": "USD"
}
```

### 6. Withdraw Money

```bash
curl -X POST http://localhost:3000/withdraw \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"amount": 200}'
```

**Response:**
```json
{
  "message": "Withdrawal successful",
  "username": "user",
  "withdrawAmount": 200,
  "newBalance": 5300,
  "currency": "USD"
}
```

### 7. Withdraw More Than Balance (Should Fail)

```bash
curl -X POST http://localhost:3000/withdraw \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"amount": 10000}'
```

**Response (400 Bad Request):**
```json
{
  "error": "Insufficient funds",
  "currentBalance": 5300,
  "requestedAmount": 10000,
  "shortfall": 4700
}
```

## Testing with Postman

### Step 1: Login
1. Open Postman
2. Create a new request
3. Method: `POST`
4. URL: `http://localhost:3000/login`
5. Headers:
   - `Content-Type: application/json`
6. Body (raw JSON):
   ```json
   {
     "username": "user",
     "password": "pass"
   }
   ```
7. Click **Send**
8. Copy the `token` value from the response

### Step 2: Check Balance
1. Create a new request
2. Method: `GET`
3. URL: `http://localhost:3000/balance`
4. Headers:
   - `Authorization: Bearer <paste_your_token_here>`
5. Click **Send**

### Step 3: Deposit Money
1. Create a new request
2. Method: `POST`
3. URL: `http://localhost:3000/deposit`
4. Headers:
   - `Authorization: Bearer <your_token>`
   - `Content-Type: application/json`
5. Body (raw JSON):
   ```json
   {
     "amount": 1000
   }
   ```
6. Click **Send**

### Step 4: Withdraw Money
1. Create a new request
2. Method: `POST`
3. URL: `http://localhost:3000/withdraw`
4. Headers:
   - `Authorization: Bearer <your_token>`
   - `Content-Type: application/json`
5. Body (raw JSON):
   ```json
   {
     "amount": 500
   }
   ```
6. Click **Send**

## Key Concepts Explained

### JWT (JSON Web Token)
- A self-contained token format for secure information transmission
- Contains encoded payload with user information and metadata
- Can be verified without accessing a database
- Expires after a specified duration

### Bearer Token
- A security token used in HTTP Authorization header
- Format: `Authorization: Bearer <token>`
- Standard way to transmit JWT tokens in REST APIs

### Middleware
- Functions executed during the request-response cycle
- In this project, `verifyJWT` middleware checks token validity
- Applied to protected routes before the route handler executes

### Hardcoded Credentials
- For this learning project, credentials are hardcoded
- Username: `user`
- Password: `pass`
- In production, use secure password hashing and database validation

## Security Considerations

⚠️ **This is a learning project. For production use:**

1. **Never hardcode credentials** - Use secure database with password hashing
2. **Use HTTPS** - Always transmit tokens over encrypted connections
3. **Implement token refresh** - Allow users to refresh expired tokens
4. **Add rate limiting** - Prevent brute force login attempts
5. **Store secrets securely** - Use environment variables for SECRET_KEY
6. **Validate all inputs** - Implement comprehensive input validation
7. **Use secure headers** - Implement CORS, CSRF protection, etc.
8. **Add logging** - Log authentication attempts and suspicious activity
9. **Implement logout** - Maintain a token blacklist or use session management
10. **Regular security audits** - Keep dependencies updated and monitor vulnerabilities

## Dependencies

- **express** (^4.18.2) - Web framework for Node.js
- **jsonwebtoken** (^9.0.0) - JWT token generation and verification
- **nodemon** (^2.0.22) - Auto-restart server during development (dev dependency)

## Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid input (missing fields, invalid amounts) |
| 401 | Unauthorized | Missing token or invalid credentials |
| 403 | Forbidden | Invalid or expired token |
| 404 | Not Found | Endpoint does not exist |
| 500 | Internal Error | Server error |

## Learning Outcomes

After completing this project, you will understand:

1. How to generate and sign JWT tokens
2. How to verify tokens in middleware
3. How to extract and validate Bearer tokens from headers
4. How to protect routes using authentication middleware
5. How to handle authentication errors appropriately
6. How to implement secure API endpoints
7. Best practices for token-based authentication

## Future Enhancements

- Add database integration for persistent user accounts and balances
- Implement password hashing with bcrypt
- Add user registration endpoint
- Implement token refresh mechanism
- Add transaction history
- Implement role-based access control (RBAC)
- Add rate limiting
- Implement comprehensive logging
- Add API documentation with Swagger/OpenAPI

## License

MIT License

## Author

Created as a learning project for JWT authentication in Express.js
