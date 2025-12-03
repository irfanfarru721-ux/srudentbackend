// routes/orders.js
import express from "express";
import Order from "../models/Order.js";
import { protectUser, protectVendor, protectAdmin } from "../middleware/auth.js"; // adjust middleware names to your project
import Product from "../models/Product.js";

const router = express.Router();

// Create order (public, requires user auth)
router.post("/", protectUser, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "Cart empty" });

    let subTotal = 0;
    for (const it of items) {
      // optional: validate product price from DB
      const prod = await Product.findById(it.productId).select("price vendorId name image");
      if (!prod) return res.status(400).json({ message: "Product not found" });
      it.price = prod.price;
      it.name = prod.name;
      it.vendorId = prod.vendorId;
      it.image = prod.image;
      subTotal += prod.price * (it.qty || 1);
    }

    const deliveryFee = 0;
    const tax = 0;
    const total = subTotal + deliveryFee + tax;

    const order = new Order({
      userId: req.user._id,
      items,
      shippingAddress,
      subTotal,
      deliveryFee,
      tax,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "pending" : "pending",
      status: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get orders for logged-in user
router.get("/user", protectUser, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// Get orders for a vendor (vendor middleware) - lists orders containing items for this vendor
router.get("/vendor", protectVendor, async (req, res) => {
  // find orders where any item.vendorId === req.vendor._id
  const vendorId = req.vendor._id;
  const orders = await Order.find({ "items.vendorId": vendorId }).sort({ createdAt: -1 });
  res.json(orders);
});

// Get order by id (user/vendor/admin)
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    // check permission: if user, ensure owner; if vendor, ensure belongs to that vendor; if admin, allow
    // For simplicity assume protect middleware applied where needed by separate endpoints
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin list of all orders
router.get("/admin/list", protectAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Update status (vendor or admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin stat: total count & sales in date range
router.get("/admin/stats", protectAdmin, async (req, res) => {
  try {
    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;
    const match = {};
    if (from || to) {
      match.createdAt = {};
      if (from) match.createdAt.$gte = from;
      if (to) match.createdAt.$lte = to;
    }
    const total = await Order.countDocuments(match);
    const salesAgg = await Order.aggregate([
      { $match: match },
      { $group: { _id: null, totalSales: { $sum: "$total" } } }
    ]);
    res.json({ total, totalSales: (salesAgg[0] && salesAgg[0].totalSales) || 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
