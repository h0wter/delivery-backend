import { Order } from '../../models/orders.js';

export const addOrder = async (req, res) => {
  const totalPrice = req.body.products.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );
  const result = await Order.create({ ...req.body, totalPrice });
  res.status(201).json(result);
};
