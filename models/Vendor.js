import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  image: { type: String },
  address: { type: String }
});

export default mongoose.model("Vendor", VendorSchema);
