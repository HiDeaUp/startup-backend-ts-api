import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

    try {
      await mongoose.connect(mongoUri);
      console.log('Connected to database');
    } catch (error) {
      console.error('Could not connect to database', error);
    }
  };