import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }
});

export default mongoose.model("Module", ModuleSchema);
