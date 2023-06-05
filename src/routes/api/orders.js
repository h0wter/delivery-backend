import express from 'express';
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js';
import { validationBody } from '../../middlewares/validationBody.js';
import { postOrderSchema } from '../../models/orders.js';
import { getAll } from '../../controllers/orders/getAll.js';
import { addOrder } from '../../controllers/orders/addOrder.js';

export const ordersRouter = express.Router();

ordersRouter.get('/', ctrlWrapper(getAll));
ordersRouter.post('/', validationBody(postOrderSchema), ctrlWrapper(addOrder));
