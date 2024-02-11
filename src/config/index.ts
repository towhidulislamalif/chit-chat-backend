import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Configuration object
const config = {
  node_env: process.env.NODE_ENV,
  origin: process.env.CORS_ORIGIN,
  port: process.env.PORT || 8080, // Default port is 8080 if not specified
  mongodbURI: process.env.MONGODB_URI,
};

export default config;
