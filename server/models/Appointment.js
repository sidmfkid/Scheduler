import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  customer: {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: String },
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  assigned_resource: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Active_Stores" },
});

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);

export default AppointmentModel;
