const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key_banking_api';

// Hardcoded credentials for this exercise
const VALID_USERNAME = 'user';
const VALID_PASSWORD = 'pass';

// In-memory account balance (in a real app, this would be in a database)
let accountBalance = 5000;

// Middleware to parse JSON
app.use(express.json());

// ==================== Middleware ====================

// JWT Verification Middleware
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No Bearer token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired Bearer token' });
  }
};

// ==================== Authentication Endpoint ====================

// POST /login - Generate JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (!username || !password) {
    return res.status(400).json({ error: 'Bad Request: Username and password are required' });
  }

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username, iat: Date.now() },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'Login successful',
    token,
    expiresIn: '1 hour'
  });
});

// ==================== Protected Banking Endpoints ====================

// GET /balance - View account balance
app.get('/balance', verifyJWT, (req, res) => {
  res.json({
    message: 'Balance retrieved successfully',
    username: req.user.username,
    balance: accountBalance,
    currency: 'USD'
  });
});

// POST /deposit - Deposit money
app.post('/deposit', verifyJWT, (req, res) => {
  const { amount } = req.body;

  // Validate amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Bad Request: Amount must be a positive number' });
  }

  if (!Number.isFinite(amount)) {
    return res.status(400).json({ error: 'Bad Request: Amount must be a valid number' });
  }

  accountBalance += amount;

  res.json({
    message: 'Deposit successful',
    username: req.user.username,
    depositAmount: amount,
    newBalance: accountBalance,
    currency: 'USD'
  });
});

// POST /withdraw - Withdraw money
app.post('/withdraw', verifyJWT, (req, res) => {
  const { amount } = req.body;

  // Validate amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Bad Request: Amount must be a positive number' });
  }

  if (!Number.isFinite(amount)) {
    return res.status(400).json({ error: 'Bad Request: Amount must be a valid number' });
  }

  // Check sufficient balance
  if (amount > accountBalance) {
    return res.status(400).json({
      error: 'Insufficient funds',
      currentBalance: accountBalance,
      requestedAmount: amount,
      shortfall: amount - accountBalance
    });
  }

  accountBalance -= amount;

  res.json({
    message: 'Withdrawal successful',
    username: req.user.username,
    withdrawAmount: amount,
    newBalance: accountBalance,
    currency: 'USD'
  });
});

// ==================== Health Check ====================

// GET / - Server health check
app.get('/', (req, res) => {
  res.json({ status: 'Banking API server is running' });
});

// ==================== Error Handling ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found: Endpoint does not exist' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ==================== Start Server ====================

app.listen(port, () => {
  console.log(`Banking API server running on http://localhost:${port}`);
  console.log(`Current account balance: $${accountBalance}`);
  console.log('\nDemo Credentials:');
  console.log(`Username: ${VALID_USERNAME}`);
  console.log(`Password: ${VALID_PASSWORD}`);
});
