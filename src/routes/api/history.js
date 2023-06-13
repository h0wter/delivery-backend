import express from 'express';
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js';
import { getHistory } from '../../controllers/history/getHistory.js';

export const historyRouter = express.Router();

historyRouter.get('/', ctrlWrapper(getHistory));
