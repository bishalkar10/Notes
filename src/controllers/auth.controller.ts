import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from "../models/user.model"
import { environment } from '../config/environment';
import { createError } from '../utils/errors';

const setCookieToken = (res: Response, token: string) => {
  res.cookie('session_token', token, {
    secure: environment.NODE_ENV === 'production',
    sameSite: 'lax',
    signed: true,
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export const authController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
  
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw createError(409, 'Email already registered');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email: email.toLowerCase(), password: hashedPassword });
  
    res.status(201).json({
      status: "success",
      message: 'User registered successfully'
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw createError(404, 'User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError(401, 'Invalid password');
    }

    const token = jwt.sign({ 
      id: user.id,
      email: user.email
    }, environment.JWT_SECRET as string, {
      expiresIn: '1d'
    });

    setCookieToken(res, token);

    console.log("login successful")
    res.status(200).json({ 
      status: 'success',
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email
      }
    });
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('session_token');
    res.json({ message: 'Logged out successfully' });
  }
}; 