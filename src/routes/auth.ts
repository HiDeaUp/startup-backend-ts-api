import express, { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.type';
import { UserModel } from '../models/user';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Sign-up
router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Sign-in
router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

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
