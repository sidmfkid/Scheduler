import Shopify, { DataType } from "@shopify/shopify-api";
import express from "express";
import template from "../../template";
import Service from "../models/Service";
import StoreModel from "../models/storeModel";

const servicesRoutes = express.Router();

function createData(title, details, shopify_id, status, tags, image) {
  return { title, details, shopify_id, status, tags, image };
}

servicesRoutes.get("/", async (req, res) => {
  try {
    res.status(200).send(template());
  } catch (error) {
    console.log(error, "error on services route ");
  }
});

servicesRoutes.get("/all", async (req, res) => {
  try {
    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
    const products = await client.get({
      path: "products",
    });

    const importedServices = await StoreModel.findOne(
      { shop: session.shop },
      "services"
    );

    res.status(200).json({
      data: products.body.products,
      imported: importedServices.services,
    });
  } catch (error) {
    console.log(error, "error on services route ");
  }
});

servicesRoutes.get("/edit", async (req, res) => {
  res.send(template());
});

servicesRoutes.post("/import", async (req, res) => {
  try {
    const allData = req.body.data;

    const services = allData.map((data) => {
      return createData(
        data.title,
        data.body_html,
        data.id,
        data.status,
        data.tags,
        data.images[0].src
      );
    });

    console.log(services);

    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);

    await StoreModel.findOneAndUpdate(
      { shop: session.shop },
      {
        services: [],
      }
    );

    await StoreModel.findOneAndUpdate(
      { shop: session.shop },
      {
        $push: { services: services },
      }
    );

    res.status(200).json({ data: services });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

export default servicesRoutes;
