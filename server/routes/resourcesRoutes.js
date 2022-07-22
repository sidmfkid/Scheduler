import Shopify, { DataType } from "@shopify/shopify-api";
import express from "express";
import template from "../../template";
import ResourceModel from "../models/Resource";
import ServiceModel from "../models/Service";
import StoreModel from "../models/storeModel";

const resourcesRoutes = express.Router();

resourcesRoutes.get("/", async (req, res) => {
  res.status(200).send(template());
});

resourcesRoutes.get("/all", async (req, res) => {
  res.status(200).send(template());
});

resourcesRoutes.post("/new", async (req, res) => {
  try {
    console.log(req.body);

    let resourceData = { ...req.body.body };

    console.log({ ...resourceData });
    const session = await Shopify.Utils.loadCurrentSession(req, res);

    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const currentShop = await StoreModel.findOne({ shop: session.shop });
    const services = await ServiceModel.find({ shop: currentShop._id });

    const resourceServicesIds = services.map((v) => {
      let arr = resourceData.services.filter((data) => data === v.title);

      if (arr.length > 0) {
        return v._id;
      } else {
        return;
      }
    });

    const filteredIds = resourceServicesIds.filter((id) => id !== undefined);
    console.log(resourceServicesIds, "resource service ids");

    resourceData.services = filteredIds;
    resourceData.shop = currentShop._id;

    console.log(resourceData);
    // const shop = 'shop';

    // resourceData[shop]: currentShop._id;

    await ResourceModel.create({ ...resourceData });

    const newResource = await ResourceModel.findOne({ shop: currentShop._id });
    console.log(newResource);

    res.json({ data: req.body, resource: newResource });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

export default resourcesRoutes;
