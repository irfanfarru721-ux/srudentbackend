import Product from "../models/Product.js";

export const getProductsByCategory = async (req, res) => {
  const products = await Product.find({ categoryId: req.params.categoryId });
  res.json(products);
};
