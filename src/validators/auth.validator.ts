import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createError } from '../utils/errors';

// Validation schemas
const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
});

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

// Middleware function for validation
const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(createError(400, error.errors[0].message));
      } else {
        next(createError(500, 'Validation error'));
      }
    }
  };
};

// Use the generic validation function for login and registration
export const validateLogin = validateSchema(loginSchema);
export const validateRegister = validateSchema(registerSchema);
