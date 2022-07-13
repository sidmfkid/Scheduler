import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  blackout_dates: [{ start: { type: Date }, end: { type: Date } }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const ResourceModel = mongoose.model("Resource", ResourceSchema);

export default ResourceModel;
