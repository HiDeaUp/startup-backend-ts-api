import express, { Request, Response } from 'express';

import { router as authRoutes } from './routes/auth';
import { connectToDatabase } from './database';

const app = express();
const port = 3000;

connectToDatabase();

app.use(express.json()); // Middleware for parsing JSON bodies

app.get('/', (req: Request, res: Response) => {
  res.send('Hello You!');
});

app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
