import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { createError } from "../utils/errors";

// Common validation rules
const commonFields = {
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email cannot exceed 255 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
};

// Validation schemas
const loginSchema = z.object(commonFields);

const registerSchema = z.object({
  ...commonFields,
  password: commonFields.password
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// Type-safe schema validation
const validateSchema = <T extends z.ZodSchema>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(createError(400, error.errors[0].message));
      } else {
        next(createError(500, "Validation error"));
      }
    }
  };
};

export const validateLogin = validateSchema(loginSchema);
export const validateRegister = validateSchema(registerSchema);
