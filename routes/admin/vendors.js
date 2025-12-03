import express from 'express';
import Vendor from '../../models/Vendor.js';
import { adminProtect } from '../../middleware/adminAuth.js';

const router = express.Router();

// Get vendors
router.get('/', adminProtect, async (req, res) => {
  const vendors = await Vendor.find().populate('moduleId');
  res.json(vendors);
});

// Count vendors
router.get('/count', adminProtect, async (req, res) => {
  const total = await Vendor.countDocuments();
  res.json({ total });
});

// Create vendor
router.post('/', adminProtect, async (req, res) => {
  const v = new Vendor(req.body);
  await v.save();
  res.status(201).json(v);
});

// Update vendor
router.put('/:id', adminProtect, async (req, res) => {
  const v = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(v);
});

// Delete vendor
router.delete('/:id', adminProtect, async (req, res) => {
  await Vendor.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

export default router;
