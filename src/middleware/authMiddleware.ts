import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/user/user.type';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }

    // Ensure the JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded as User; // Attach the user payload to the request object
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
