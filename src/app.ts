import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';

const app = express();

// Middleware
app.use(express.static('public'));
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
import routes from './routes/index';
import globalErrorHandler from './middleware/globalErrorHandler';

// API routes
app.use('/api/v1', routes);

// Not found route
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    errorCode: 404,
    errorMessage:
      'The requested resource was not found on the server. Please check the URL and try again.',
    errorSources: [
      {
        path: req.url,
        message:
          'The requested resource was not found on the server. Please check the URL and try again.',
      },
    ],
  });
});

// Global error handler middleware
app.use(globalErrorHandler);

export default app;
