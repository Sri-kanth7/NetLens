import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validateRequest } from '../../middleware/validate-request.js';
import {
  forgotPasswordController,
  loginController,
  logoutController,
  meController,
  refreshController,
  registerController,
  resetPasswordController
} from './auth.controller.js';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema
} from './auth.schema.js';

export const authRouter = Router();

authRouter.post('/register', validateRequest(registerSchema), registerController);
authRouter.post('/login', validateRequest(loginSchema), loginController);
authRouter.post('/refresh', validateRequest(refreshSchema), refreshController);
authRouter.post('/logout', validateRequest(refreshSchema), logoutController);
authRouter.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordController);
authRouter.post('/reset-password', validateRequest(resetPasswordSchema), resetPasswordController);
authRouter.get('/me', authenticate, meController);
