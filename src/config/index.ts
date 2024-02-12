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
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
};

export default config;
