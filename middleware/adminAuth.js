import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const adminProtect = async (req,res,next) => {
  try{
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
    req.admin = user;
    next();
  }catch(err){
    res.status(401).json({ message: 'Token invalid' });
  }
};
