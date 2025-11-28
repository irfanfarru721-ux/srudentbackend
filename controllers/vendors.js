import Vendor from "../models/Vendor.js";

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("moduleId");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorsByModule = async (req, res) => {
  try {
    const vendors = await Vendor.find({ moduleId: req.params.moduleId });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
