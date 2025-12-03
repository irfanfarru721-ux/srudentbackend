import express from 'express';
import Module from '../../models/Module.js';
import { adminProtect } from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/', adminProtect, async (req,res)=>{
  const modules = await Module.find();
  res.json(modules);
});

router.post('/', adminProtect, async (req,res)=>{
  const m = new Module({ name:req.body.name, image:req.body.image });
  await m.save();
  res.status(201).json(m);
});

router.put('/:id', adminProtect, async (req,res)=>{
  const m = await Module.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(m);
});

router.delete('/:id', adminProtect, async (req,res)=>{
  await Module.findByIdAndDelete(req.params.id);
  res.json({ message:'deleted' });
});

export default router;
