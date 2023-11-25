import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { router as authRoutes } from './routes/auth';
import { connectToDatabase } from './database';

// load environment variables from .env file
dotenv.config();

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 100, // Limit each IP to 100 requests per `window` (here, per minute)
})


const app = express();
const port = 3000;

connectToDatabase();

// Apply the rate limiting middleware to API calls only
// Further info about rate limiting https://en.wikipedia.org/wiki/Rate_limiting
app.use(rateLimiter);

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies
app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
