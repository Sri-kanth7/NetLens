import pino from 'pino';
import { env } from './env.js';

export const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  base: {
    service: 'netlens-api',
    env: env.NODE_ENV
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'password', 'refreshToken'],
    remove: true
  }
});
