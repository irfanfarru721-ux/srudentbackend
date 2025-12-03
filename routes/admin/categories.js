import express from 'express';
import Category from '../../models/Category.js';
import { adminProtect } from '../../middleware/adminAuth.js';

const router = express.Router();

// Get categories
router.get('/', adminProtect, async (req, res) => {
  const list = await Category.find().populate('vendorId');
  res.json(list);
});

// Count categories
router.get('/count', adminProtect, async (req, res) => {
  const total = await Category.countDocuments();
  res.json({ total });
});

// Create category
router.post('/', adminProtect, async (req, res) => {
  const c = new Category(req.body);
  await c.save();
  res.status(201).json(c);
});

// Update category
router.put('/:id', adminProtect, async (req, res) => {
  const c = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(c);
});

// Delete category
router.delete('/:id', adminProtect, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

export default router;
