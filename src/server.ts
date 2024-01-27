import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
const port = 5000;

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`flower management server on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
