import { Order } from '../../models/orders.js';

export const getHistory = async (req, res) => {
  const { email, phone } = req.query;
  const result = await Order.find({ email, phone });
  res.status(200).json(result);
};
