import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  details: { type: String },
  duration: { type: Number },
  shopify_id: { type: Number },
  status: { type: String },
  tags: { type: String },
  image: { type: String },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Active_Stores" },
});

const ServiceModel = mongoose.model("Service", ServiceSchema);

export default ServiceModel;
