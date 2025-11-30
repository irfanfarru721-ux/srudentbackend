import express from 'express';
import { getCart, addOrUpdateItem, removeItem, clearCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


// all routes protected
router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addOrUpdateItem); // { productId, qty }
router.put('/', authMiddleware, addOrUpdateItem); // same as post (idempotent update)
router.delete('/item/:productId', authMiddleware, removeItem);
router.delete('/', authMiddleware, clearCart);


export default router;
