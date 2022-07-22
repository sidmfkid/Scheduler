import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  blackout_dates: [{ start: { type: Date }, end: { type: Date } }],
  availability: {
    Sun: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
    Mon: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
    Tues: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
    Wed: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
    Thur: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
    Fri: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
    Sat: {
      available: { type: Boolean },
      start: { type: String },
      end: { type: String },
    },
  },
  resourceType: { type: String },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Active_Stores" },
});

const ResourceModel = mongoose.model("Resource", ResourceSchema);

export default ResourceModel;
