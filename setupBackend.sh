#!/bin/bash

echo "🚀 Starting backend setup..."

# 1. Install dependencies
echo "📦 Installing npm packages..."
npm install

# 2. Seed database
echo "🌱 Seeding database..."
node -e "
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Module from './models/Module.js';
import Vendor from './models/Vendor.js';
import Product from './models/Product.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ MongoDB connected')).catch(err => console.error(err));

(async () => {
  try {
    await Product.deleteMany();
    await Vendor.deleteMany();
    await Module.deleteMany();

    const groceryModule = await Module.create({ name: 'Grocery', image: 'grocery.jpg' });
    const restaurantModule = await Module.create({ name: 'Restaurants', image: 'restaurant.jpg' });

    const freshMarketVendor = await Vendor.create({ name: 'Fresh Market', moduleId: groceryModule._id, image: 'market.jpg' });
    const foodCourtVendor = await Vendor.create({ name: 'Food Court', moduleId: restaurantModule._id, image: 'foodcourt.jpg' });

    await Product.create([
      { name: 'Apples', price: 50, vendorId: freshMarketVendor._id, image: 'apples.jpg' },
      { name: 'Bananas', price: 30, vendorId: freshMarketVendor._id, image: 'bananas.jpg' },
      { name: 'Pizza', price: 250, vendorId: foodCourtVendor._id, image: 'pizza.jpg' },
      { name: 'Burger', price: 120, vendorId: foodCourtVendor._id, image: 'burger.jpg' }
    ]);

    console.log('✅ Database seeding complete!');
    process.exit();
  } catch(e) {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  }
})();
"

# 3. Start backend
echo "🚀 Starting backend server..."
node server.js
