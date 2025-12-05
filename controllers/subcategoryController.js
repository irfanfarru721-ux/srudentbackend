import Subcategory from "../models/Subcategory.js";

// CREATE Subcategory
export const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId, moduleId } = req.body;
    if (!name || !categoryId || !moduleId)
      return res.status(400).json({ message: "All fields are required" });

    const subcategory = new Subcategory({ name, categoryId, moduleId });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all Subcategories
export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("categoryId", "name")
      .populate("moduleId", "name");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single Subcategory
export const getSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id)
      .populate("categoryId", "name")
      .populate("moduleId", "name");
    if (!subcategory) return res.status(404).json({ message: "Not found" });
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { name, categoryId, moduleId, status } = req.body;
    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name, categoryId, moduleId, status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Subcategory
export const deleteSubcategory = async (req, res) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
