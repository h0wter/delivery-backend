import express from 'express';
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js';
import { getAll } from '../../controllers/shops/getAll.js';
import { Shop } from '../../models/shops.js';

export const shopsRouter = express.Router();

shopsRouter.get('/', ctrlWrapper(getAll));
shopsRouter.post(
  '/',
  ctrlWrapper(async (req, res) => {
    console.log(req.body);
    const result = await Shop.create({ ...req.body });
    console.log('result', result);
    res.status(201).json(result);
  })
);
