import { Request, Response, NextFunction } from 'express';
import jwt, {VerifyErrors} from 'jsonwebtoken';
import { environment } from '../config/environment';
import { createError } from '../utils/errors';

interface AuthenticatedRequest extends Request {
	user?: { id: string; email: string };
}

interface JwtPayload {
	id: string;
	email: string;
}

export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies.session_token;
    
    if (!token) {
      throw createError(401, 'Authentication required');
    }

    jwt.verify(token, environment.JWT_SECRET as string, (err: VerifyErrors | null, decoded?: object | string) => {
        if (err || !decoded) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        req.user = decoded as JwtPayload;
        next();
    });
  } catch (error) {
    next(createError(401, 'Invalid token'));
  }
};

// Optional authentication middleware - populates req.user if token is valid, but doesn't fail if no token
export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.signedCookies.session_token;
    
    if (!token) {
      // No token provided, continue without authentication
      return next();
    }

    jwt.verify(token, environment.JWT_SECRET as string, (err: VerifyErrors | null, decoded?: object | string) => {
        if (err || !decoded) {
            // Invalid token, continue without authentication
            return next();
        }

        // Valid token, populate user
        req.user = decoded as JwtPayload;
        next();
    });
  } catch (error) {
    // Error during authentication, continue without authentication
    next();
  }
}; 