import Shopify, { DataType } from "@shopify/shopify-api";
import template from "../../template";
import ServiceModel from "../models/Service";
import StoreModel from "../models/storeModel";
import express from "express";

import mongoose from "mongoose";

const servicesRoutes = express.Router();

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

    if (!session.shop) {
      return res.redirect(`/auth?shop=${req.query.shop}`);
    }

    // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
    const products = await client.get({
      path: "products",
    });

    const currentStore = await StoreModel.findOne({ shop: session.shop });
    const storeID = mongoose.Types.ObjectId(currentStore._id);
    const importedServices = await ServiceModel.find({
      shop: storeID,
    });
    // console.log(importedServices, storeID);

    res
      .status(200)
      .json({ data: { data: products.body.products, importedServices } });
  } catch (error) {
    console.log(error, "error on services route ");
  }
});

servicesRoutes.get("/edit", async (req, res) => {
  res.send(template());
});

servicesRoutes.post("/edit", async (req, res) => {
  try {
    function createData(
      title,
      details,
      shopify_id,
      status,
      tags,
      image,
      shop,
      duration,
      resources
    ) {
      return {
        title,
        details,
        shopify_id,
        status,
        tags,
        image,
        shop,
        duration,
        resources,
      };
    }
    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const currentShop = await StoreModel.findOne({ shop: session.shop });

    const body = req.body.data;

    const update = {
      title: body.title,
      tags: body.tags.toString(),
      resources: body.resources,
      duration: Number(body.hours) * 60 + Number(body.minutes),
    };

    await ServiceModel.findByIdAndUpdate(body.id, update);
    const updatedService = await ServiceModel.findById(body.id);
    console.log(updatedService, "updated service");

    res.json({ data: updatedService });
  } catch (error) {
    console.log(error);
  }
});

servicesRoutes.get("/import", async (req, res) => {
  try {
    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const currentStore = await StoreModel.find({ shop: session.shop });

    const importedServices = await ServiceModel.find({
      shop: currentStore[0]._id,
    });

    console.log(currentStore[0]._id);

    res.status(200).json({ data: importedServices });
  } catch (error) {
    console.log(error);
  }
});

servicesRoutes.post("/import", async (req, res) => {
  try {
    function createData(title, details, shopify_id, status, tags, image, shop) {
      return { title, details, shopify_id, status, tags, image, shop };
    }
    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const currentShop = await StoreModel.findOne({ shop: session.shop });
    const currentServices = await ServiceModel.find({ shop: currentShop._id });

    const allData = req.body.data;

    // const servicesData = allData.filter((data) => {
    //   return currentServices.some((v) => {
    //     if (data.id !== v.shopify_id) {
    //       return createData(
    //         data.title,
    //         data.body_html,
    //         data.id,
    //         data.status,
    //         data.tags,
    //         data.images[0].src,
    //         currentShop._id
    //       );
    //     }
    //   });
    // });

    const services = allData.map((data) => {
      let arr = currentServices.filter((v) => v.shopify_id === data.id);

      if (!(arr.length > 0)) {
        return createData(
          data.title,
          data.body_html,
          data.id,
          data.status,
          data.tags,
          data.images[0].src,
          currentShop._id
        );
      }
    });

    console.log(services);

    // await ServiceModel.deleteMany({ shop: currentShop._id });

    // await StoreModel.findOneAndUpdate(
    //   { shop: session.shop },
    //   {
    //     services: [],
    //   }
    // );

    await ServiceModel.insertMany(services);

    const updateServices = await ServiceModel.find({ shop: currentShop._id });
    const updateServicesID = updateServices.map((v) => v._id);

    await StoreModel.updateMany(
      { shop: session.shop },
      { services: updateServicesID }
    );

    const updatedShop = await StoreModel.findOne({ shop: session.shop });

    res.status(200).json({ data: { services, updatedShop, updateServices } });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

export default servicesRoutes;
