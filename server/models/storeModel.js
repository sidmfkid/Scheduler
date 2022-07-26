import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: false },
  subscription: {
    id: { type: String, required: false },
    status: { type: String, required: false },
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Services" }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
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
});

const StoreModel = mongoose.model("Active_Stores", StoreSchema);

export default StoreModel;
