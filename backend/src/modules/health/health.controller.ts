import type { Request, Response } from 'express';
import { sendSuccess } from '../../shared/responses/api-response.js';

export function getHealth(_request: Request, response: Response) {
  return sendSuccess(response, {
    message: 'Health check successful.',
    data: {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
}