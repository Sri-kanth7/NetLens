import type { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';

export function requestLogger(request: Request, response: Response, next: NextFunction) {
  const startedAt = Date.now();

  response.on('finish', () => {
    logger.info(
      {
        requestId: request.requestId,
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
        durationMs: Date.now() - startedAt,
        ip: request.ip
      },
      'request completed'
    );
  });

  next();
}
