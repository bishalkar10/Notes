import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

type KnownError = Error & { status?: number; code?: number };

export const errorHandler = (
  err: KnownError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    path: req.path,
    method: req.method,
    error: err
  });

  // Handle errors created with createError
  if ((err as any).status) {
    return res.status((err as any).status).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: err.errors[0].message
    });
  }

  // Handle mongoose duplicate key error
  if ((err as any).code === 11000) {
    return res.status(409).json({
      status: 'error',
      message: 'Duplicate value entered'
    });
  }

  // Handle all other errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}; 