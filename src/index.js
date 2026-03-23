require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Request Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
/**
 * @desc    Health check / welcome route
 * @route   GET /
 * @access  Public
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Voyaj Auth API' });
});

app.use('/api/auth', authRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Listen only if not on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

// Handle unhandled promise rejections
/**
 * Global handler for unhandled promise rejections.
 * Logs the error message to the console.
 * @param {Error} err - The error that caused the rejection
 * @param {Promise} promise - The promise that was rejected
 */
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});

module.exports = app;
