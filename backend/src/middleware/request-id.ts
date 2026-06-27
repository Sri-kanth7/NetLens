import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export function requestId(request: Request, response: Response, next: NextFunction) {
  const incomingRequestId = request.header('x-request-id');
  const requestIdValue = incomingRequestId && incomingRequestId.length > 0 ? incomingRequestId : randomUUID();

  request.requestId = requestIdValue;
  response.setHeader('x-request-id', requestIdValue);
  next();
}
