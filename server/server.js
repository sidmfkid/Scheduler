import express from "express";
import devBundle from "./devBundle.js"; // comment this line  when you are working in production mode
import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./appointmentData.js";
import AppointmentModel from "./models/Appointment.js";
import ResourceModel from "./models/Resource.js";
import ServiceModel from "./models/Service.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const {
  SHOP_API_SECRET,
  SHOP_API_KEY,
  SHOP_API_SCOPES,
  HOST,
  DB_URL,
  SHOP,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;

const app = express();

devBundle.compile(app); // comment this line when you are working in production mode

import path from "path";

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

import template from "./../template";

const dbUrl = "mongodb://localhost:27017/calendy" || DB_URL;
connectDB().catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("open"));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).send(template());
});

app.get("/appointments", async (req, res) => {
  res.status(200).send(template());
});

app.get("/appointments/all", async (req, res) => {
  const allAppointments = await AppointmentModel.find({}).populate("services");

  res.json({ data: allAppointments });
});

app.get("/dashboard", async (req, res) => {
  res.status(200).send(template());
});

app.get("/account", async (req, res) => {
  res.status(200).send(template());
});

app.get("/availability", async (req, res) => {
  res.status(200).send(template());
});

app.get("/plans", async (req, res) => {
  res.status(200).send(template());
});

app.get("/resources", async (req, res) => {
  res.status(200).send(template());
});

app.get("/services", async (req, res) => {
  res.status(200).send(template());
});

app.get("/settings", async (req, res) => {
  res.status(200).send(template());
});

app.get("/appointments", async (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});
