import express, { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.type';

const router = express.Router();
const users: User[] = []; // This would be your database in a real application

const JWT_SECRET = 'your_jwt_secret'; // Store this securely

// Sign-up
router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashedPassword };
  users.push(newUser);
  res.status(201).send('User created');
});

// Sign-in
router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Sign-out
router.post('/signout', (req: Request, res: Response) => {
  // Sign-out logic (usually handled client-side by removing the token)
  res.send('Signed out');
});

export { router };
