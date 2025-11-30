import Cart from '../models/Cart.js';
import Product from '../models/Product.js';


// Get cart for current user (create empty if not exists)
export const getCart = async (req, res) => {
try {
const userId = req.user._id;
let cart = await Cart.findOne({ user: userId }).populate('items.product');
if (!cart) {
cart = await Cart.create({ user: userId, items: [] });
}
return res.json(cart);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


// Add or update item: body { productId, qty }
export const addOrUpdateItem = async (req, res) => {
try {
const userId = req.user._id;
const { productId, qty = 1 } = req.body;


if (!productId) return res.status(400).json({ message: 'productId required' });


const product = await Product.findById(productId);
if (!product) return res.status(404).json({ message: 'Product not found' });


let cart = await Cart.findOne({ user: userId });
if (!cart) cart = await Cart.create({ user: userId, items: [] });


const existing = cart.items.find((it) => it.product.toString() === productId.toString());
if (existing) {
existing.qty = qty;
existing.price = product.price;
existing.name = product.name;
} else {
cart.items.push({ product: productId, qty, price: product.price, name: product.name });
}


await cart.save();
await cart.populate('items.product');
return res.json(cart);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


// Remove single item by productId
export const removeItem = async (req, res) => {
try {
const userId = req.user._id;
const { productId } = req.params;


let cart = await Cart.findOne({ user: userId });
if (!cart) return res.status(404).json({ message: 'Cart not found' });


cart.items = cart.items.filter((it) => it.product.toString() !== productId.toString());
await cart.save();
await cart.populate('items.product');
return res.json(cart);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


// Clear cart
export const clearCart = async (req, res) => {
try {
const userId = req.user._id;
let cart = await Cart.findOne({ user: userId });
if (!cart) return res.json({ items: [] });
cart.items = [];
await cart.save();
return res.json(cart);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};
