import express from "express";
import devBundle from "./devBundle.js"; // comment this line  when you are working in production mode
import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./appointmentData.js";
import AppointmentModel from "./models/Appointment.js";
import ResourceModel from "./models/Resource.js";
import path from "path";
const { resolve } = require("path");
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Shopify from "@shopify/shopify-api";
import StoreModel from "./models/storeModel";
import Service from "./models/Service";
import topLevelAuthRedirect from "./utils/topLevelAuthRedirect";
import webhookRegistrar from "./webhooks/webhookRegistrar";
import webhookRoutes from "./webhooks/_routes.js";
import sessionStorage from "./utils/sessionStorage";
import isActiveShop from "./middleware/isActiveShop.js";
import verifyRequest from "./middleware/verifyRequest.js";
import applyAuthMiddleware from "./middleware/auth";
import userRoutes from "./routes/index";
import { appUninstallHandler } from "./webhooks/app_uninstalled";
import csp from "./middleware/csp.js";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./webhooks/gdpr";
import template from "./../template";
import servicesRoutes from "./routes/servicesRoutes.js";

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

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

Shopify.Context.initialize({
  API_KEY: SHOP_API_KEY,
  API_SECRET_KEY: SHOP_API_SECRET,
  SCOPES: [SHOP_API_SCOPES],
  HOST_NAME: HOST,
  API_VERSION: "2022-07",
  IS_EMBEDDED_APP: false,
  SESSION_STORAGE: sessionStorage,
});

Shopify.Webhooks.Registry.addHandlers({
  APP_UNINSTALLED: {
    path: "/webhooks/app_uninstalled",
    webhookHandler: appUninstallHandler,
  },
  CUSTOMERS_DATA_REQUEST: {
    path: "/webhooks/gdpr/customers_data_request",
    webhookHandler: customerDataRequest,
  },
  CUSTOMERS_REDACT: {
    path: "/webhooks/gdpr/customers_redact",
    webhookHandler: customerRedact,
  },
  SHOP_REDACT: {
    path: "/webhooks/gdpr/shop_redact",
    webhookHandler: shopRedact,
  },
});

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

app.set("top-level-oauth-cookie", "shopify_top_level_oauth");
app.use(cookieParser(Shopify.Context.API_SECRET_KEY));
// app.set("use-online-tokens", true);
applyAuthMiddleware(app);

app.use("/webhooks", webhookRoutes);
app.post("/graphql", verifyRequest(app), async (req, res) => {
  try {
    const response = await Shopify.Utils.graphqlProxy(req, res);
    res.status(200).send(response.body);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.use(bodyParser.json());
app.use(csp);
app.use(isActiveShop);
app.use("/apps", verifyRequest(app), userRoutes);

app.get("/", async (req, res) => {
  try {
    const { shop } = req.query;
    const isShopAvaialble = await StoreModel.findOne({ shop });
    console.log(
      isShopAvaialble,
      typeof isShopAvaialble !== "undefined",
      "mainRoute"
    );
    if (typeof isShopAvaialble === "undefined") {
      res.redirect(`/auth?shop=${req.query.shop}`);
    } else {
      res.status(200).send(template());
    }
  } catch (error) {
    console.error(error, "ERror home ROUTE /");
  }
});

app.use("/services", servicesRoutes);

app.get("/home", async (req, res) => {
  try {
    res.send(template());
  } catch (error) {
    console.error(error, "ERror home ROUTE /");
  }
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
