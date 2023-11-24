import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/express-auth';

    try {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas database');
    } catch (error) {
      console.error('Could not connect to database', error);
    }
  };