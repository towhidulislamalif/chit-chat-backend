/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import APIError from '../error/APIError';

interface ErrorResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string;
  errorSources: Array<{ path: string; message: string }>;
  stack?: string | null;
}

const globalErrorHandler: ErrorRequestHandler = (error, _, res, next) => {
  let errorCode = error.errorCode || 500;
  let errorMessage = error.message || 'Internal Server Error';
  let errorSources = [
    {
      path: '',
      message: 'error.message',
    },
  ];

  if (error instanceof APIError) {
    errorCode = error.errorCode;
    errorMessage = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  const response: ErrorResponse = {
    success: false,
    errorCode,
    errorMessage,
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : null,
  };

  res.status(errorCode).json(response);
};

export default globalErrorHandler;
