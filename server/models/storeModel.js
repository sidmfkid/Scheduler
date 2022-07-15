import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: false },
  subscription: {
    id: { type: String, required: false },
    status: { type: String, required: false },
  },
  services: [
    {
      title: { type: String, required: true },
      resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
      details: { type: String },
      duration: { type: Number },
      shopify_id: { type: Number },
      status: { type: String },
      tags: { type: String },
      image: { type: String },
    },
  ],
});

const StoreModel = mongoose.model("Active_Stores", StoreSchema);

export default StoreModel;
