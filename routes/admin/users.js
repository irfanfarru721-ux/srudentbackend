import express from 'express';
import User from '../../models/User.js';
import { adminProtect } from '../../middleware/adminAuth.js';

const router = express.Router();

// Get all users
router.get('/', adminProtect, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Count users
router.get('/count', adminProtect, async (req, res) => {
  const total = await User.countDocuments();
  res.json({ total });
});

// Update user
router.put('/:id', adminProtect, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete user
router.delete('/:id', adminProtect, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

export default router;
