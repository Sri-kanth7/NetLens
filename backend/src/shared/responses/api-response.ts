import type { Response } from 'express';

export type ApiSuccessResponse<TData = unknown> = {
  success: true;
  message: string;
  data: TData;
  meta: Record<string, unknown>;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors: string[];
};

export function sendSuccess<TData>(
  response: Response,
  payload: {
    statusCode?: number;
    message: string;
    data: TData;
    meta?: Record<string, unknown>;
  }
) {
  const statusCode = payload.statusCode ?? 200;

  return response.status(statusCode).json({
    success: true,
    message: payload.message,
    data: payload.data,
    meta: payload.meta ?? {}
  } satisfies ApiSuccessResponse<TData>);
}

export function sendError(
  response: Response,
  payload: {
    statusCode?: number;
    message: string;
    errors?: string[];
  }
) {
  const statusCode = payload.statusCode ?? 500;

  return response.status(statusCode).json({
    success: false,
    message: payload.message,
    errors: payload.errors ?? []
  } satisfies ApiErrorResponse);
}
