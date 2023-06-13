import express from 'express';
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js';
import { getHistory } from '../../controllers/history/getHistory.js';
import { validationBody } from '../../middlewares/validationBody.js';
import { getOrdersSchema } from '../../models/orders.js';

export const historyRouter = express.Router();

historyRouter.get(
  '/',
  validationBody(getOrdersSchema),
  ctrlWrapper(getHistory)
);
