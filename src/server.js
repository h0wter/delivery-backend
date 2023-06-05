import 'dotenv/config';
import mongoose from 'mongoose';
import { app } from './app.js';

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful.');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on: http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
