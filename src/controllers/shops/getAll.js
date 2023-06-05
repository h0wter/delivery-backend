import { Shop } from '../../models/shops.js';

export const getAll = async (req, res) => {
  const result = await Shop.find();

  res.json(result);
};
