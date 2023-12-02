import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { authMiddleware } from '../middleware/authMiddleware';
import { User, UserModel } from '../models/user';

// WHY Nodemon wants this here
declare global {
  namespace Express {
    export interface Request {
      user?: User; // Add the custom property (adjust IUser according to your user model)
    }
  }
}


const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// Sign-up
// TODO Remove authMiddleware from /signin as cannot happen here
router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(16); // generating the salt for our bcrypt hasing
  const hashedPassword = await bcrypt.hash(password, salt);
  
  try {
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Sign-in
router.post('/signin', authMiddleware, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.post('/profile/:id', authMiddleware, async (req: Request, res: Response) => {
  res.status(200).send("Not Implemented Yet")
})

// Sign-out
// TODO Remove signout endpoint from backend. This should only occurs in the frontend
router.post('/signout', authMiddleware, (req: Request, res: Response) => {
  // Sign-out logic (usually handled client-side by removing the token)
  return res.send('Signed out');
});



export { router };
