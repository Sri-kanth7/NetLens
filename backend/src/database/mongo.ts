import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set('strictQuery', true);

  try {
    const connection = await mongoose.connect(env.MONGODB_URI);
    logger.info(
      {
        dbName: connection.connection.name,
        host: connection.connection.host
      },
      'MongoDB connected'
    );
    return connection;
  } catch (error) {
    logger.error({ error }, 'MongoDB connection failed');
    throw error;
  }
}

export async function disconnectMongo() {
  await mongoose.disconnect();
}
