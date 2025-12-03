// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  qty: { type: Number, default: 1 },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  image: String,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  shippingAddress: {
    line1: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
  },
  subTotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "cod" },
  paymentStatus: { type: String, enum: ["pending","paid","failed"], default: "pending" },
  status: {
    type: String,
    enum: ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"],
    default: "pending"
  },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }, // optional: single vendor scenario
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
