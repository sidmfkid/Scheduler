import Shopify from "@shopify/shopify-api";

import StoreModel from "../models/storeModel";

const getShop = async (req, res, next) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const currentShop = await StoreModel.findOne({ shop: session.shop });

    res.locals.shopId = currentShop._id;
  } catch (error) {
    console.log(error);
  }

  next();
};

export default getShop;
