import Shopify, { DataType } from "@shopify/shopify-api";
import express from "express";
import template from "../../template";
import ResourceModel from "../models/Resource";
import ServiceModel from "../models/Service";
import StoreModel from "../models/storeModel";
import getShop from "../middleware/getShop";
const resourcesRoutes = express.Router();

resourcesRoutes.get("/", async (req, res) => {
  res.status(200).send(template());
});

resourcesRoutes.get("/all", getShop, async (req, res) => {
  try {
    const shopId = res.locals.shopId;

    const resources = await ResourceModel.find({ shop: shopId }).populate(
      "services"
    );

    console.log(resources);

    res.status(200).json({ data: resources });
  } catch (error) {
    console.log(error);
  }
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

    const createResource = await ResourceModel.create({ ...resourceData });

    const createdResourceId = createResource._id;
    const createdResourceServicesIds = createResource.services;

    const updatedServices = await ServiceModel.updateMany(
      { _id: { $in: createdResourceServicesIds } },
      { $push: { resources: createdResourceId } }
    );

    console.log(updatedServices, "Updated Services");

    res.json({ data: req.body, resource: createResource });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

resourcesRoutes.post("/edit", getShop, async (req, res) => {
  try {
    const shopId = res.locals.shopId;
    // const resources = await ResourceModel.find({ shop: shopId });

    let resourceData = { ...req.body.body };
    const createdResourceId = resourceData._id;
    const createdResourceServicesNames = resourceData.services;

    const allServices = await ServiceModel.find({ shop: shopId });

    const serviceIds = allServices.map((serv) => {
      if (createdResourceServicesNames.includes(serv.title)) {
        return serv._id;
      }
    });

    const serviceIdsFiltered = serviceIds.filter((v) => v !== undefined);

    resourceData.services = serviceIdsFiltered;

    console.log(serviceIdsFiltered, "serviceIds!!!!!");
    console.log(resourceData, "resourceData!!!!!");

    const newResource = await ResourceModel.findByIdAndUpdate(
      resourceData._id,
      resourceData
    );

    const updatedServices = await ServiceModel.updateMany(
      { _id: { $in: serviceIdsFiltered } },
      { $push: { resources: createdResourceId } }
    );

    console.log(updatedServices, "UPDATED SERVICES");

    res.json({ data: resourceData, resource: newResource });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

resourcesRoutes.post("/delete", getShop, async (req, res) => {
  try {
    const shopId = res.locals.shopId;
    // const resources = await ResourceModel.find({ shop: shopId });

    const resourceData = { ...req.body.body };

    const newResource = await ResourceModel.findByIdAndDelete(resourceData._id);

    res.json({ deleted: resourceData, resource: newResource });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

export default resourcesRoutes;
