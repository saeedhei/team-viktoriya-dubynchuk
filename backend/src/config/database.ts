import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/flashcards';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('🟢 Connected to MongoDB');
  } catch (error) {
    console.error('🔴 Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
