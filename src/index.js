const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./modules/auth/auth.routes');
const waitlistRoutes = require('./modules/waitlist/waitlist.routes');
const tripRoutes = require('./modules/trip/trip.routes')

require('dotenv').config();

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

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Voyaj Auth API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/waitlist', waitlistRoutes);
app.use('/api/v1/trip', tripRoutes)

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Listen only if not on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});

module.exports = app;
