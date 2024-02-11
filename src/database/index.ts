/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../config';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongodbURI as string);
    console.log('\nDatabase connection established 🚀\n');
  } catch (error) {
    console.error('\nDatabase connection error 🥲\n', error);
    process.exit(1);
  }
};

export default connectToDatabase;
