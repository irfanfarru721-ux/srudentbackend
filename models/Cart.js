import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const CartItemSchema = new Schema({
product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
name: String,
price: Number,
qty: { type: Number, default: 1 }
});


const CartSchema = new Schema({
user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
items: [CartItemSchema]
}, { timestamps: true });


export default model('Cart', CartSchema);
