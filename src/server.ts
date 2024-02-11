/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './config';
import connectToDatabase from './database';

let server: Server;

const startServer = () => {
  const PORT = config.port;
  server = app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT} 👂`);
  });
};

const main = async () => {
  try {
    await connectToDatabase();
    startServer();
  } catch (error) {
    console.error('Error connecting to the database or starting the server:', error);
    process.exit(1); // Exit the process with an error code
  }
};

main();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
