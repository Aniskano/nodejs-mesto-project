import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { validateCreateUser, validateLogin } from './constants';
import { createUser, login } from './controllers/users';
import { NotFoundError } from './errors';
import {
  authMiddleware,
  errorLogger,
  errorMiddleware,
  requestLogger,
} from './middlewares';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';

dotenv.config();

const {
  DB_NAME = 'mestodb',
  MONGO_HOST = 'mongodb://localhost:27017',
  PORT = 3000,
} = process.env;

const app = express();

app.use(helmet.crossOriginResourcePolicy());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(`${MONGO_HOST}/${DB_NAME}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.all(/^\//, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
