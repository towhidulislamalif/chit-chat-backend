import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: config.origin || '*', credentials: true }));
app.use(cookieParser());

// Default route for application loading
app.get('/', (_, res) => {
  res.status(200).json({
    success: true,
    message: '✨ Application successfully loaded!',
  });
});

// Import routes

// API routes

// Not found route
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((_, res, next) => {
  res.status(404).json({
    success: false,
    code: 404,
    message:
      'The requested resource was not found on the server. Please check the URL and try again.',
  });
});

// Global error handler middleware

export default app;
