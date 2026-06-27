import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { logger } from '../config/logger.js';
import { AppError } from '../shared/errors/app-error.js';
import { sendError } from '../shared/responses/api-response.js';

export function notFoundHandler(request: Request, _response: Response, next: NextFunction) {
  next(new AppError(404, `Route ${request.method} ${request.originalUrl} not found.`));
}

export function errorHandler(error: unknown, request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    sendError(response, {
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors
    });
    return;
  }

  if (error instanceof ZodError) {
    sendError(response, {
      statusCode: 400,
      message: 'Validation failed.',
      errors: error.issues.map((issue) => issue.message)
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    sendError(response, {
      statusCode: 400,
      message: 'Validation failed.',
      errors: Object.values(error.errors).map((item) => item.message)
    });
    return;
  }

  if ((error as { code?: number })?.code === 11000) {
    sendError(response, {
      statusCode: 409,
      message: 'Duplicate resource.',
      errors: ['A record with that value already exists.']
    });
    return;
  }

  logger.error(
    {
      requestId: request.requestId,
      error
    },
    'unhandled error'
  );

  sendError(response, {
    statusCode: 500,
    message: 'Internal server error.',
    errors: ['An unexpected error occurred.']
  });
}
