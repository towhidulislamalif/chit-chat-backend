class APIError extends Error {
  errorCode: number;

  constructor(errorCode: number, message: string) {
    super(message);
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
