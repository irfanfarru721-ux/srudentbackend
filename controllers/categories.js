import Category from "../models/Category.js";

export const getCategoriesByVendor = async (req, res) => {
  try {
    const categories = await Category.find({ vendorId: req.params.vendorId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      vendorId: req.body.vendorId
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
