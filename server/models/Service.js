import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  details: { type: String },
  duration: { type: Number },
});

const ServiceModel = mongoose.model("Service", ServiceSchema);

export default ServiceModel;
