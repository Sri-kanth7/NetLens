import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { AppError } from '../shared/errors/app-error.js';

export function validateRequest(schema: ZodTypeAny): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: request.body,
      params: request.params,
      query: request.query
    });

    if (!parsed.success) {
      next(
        new AppError(
          400,
          'Validation failed.',
          parsed.error.issues.map((issue) => issue.message)
        )
      );
      return;
    }

    request.body = parsed.data.body ?? request.body;
    request.params = parsed.data.params ?? request.params;
    request.query = parsed.data.query ?? request.query;
    next();
  };
}
