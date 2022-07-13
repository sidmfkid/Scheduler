import Shopify, { DataType } from "@shopify/shopify-api";
import StoreModel from "../models/storeModel";
import express from "express";
import template from "../../template";
import { RecurringApplicationCharge } from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
const subscriptionRoutes = express.Router();

subscriptionRoutes.get("/", async (req, res) => {
  // do something with the returned data
  res.send(template());
});

subscriptionRoutes.post("/", async (req, res) => {
  try {
    // Load the current session to get the `accessToken`.
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    let sub = {};
    if (req.body.data === "trial") {
      sub = {
        name: "Sizely 7 Day Trial",
        returnUrl:
          "https://b7dc-2601-805-c102-92b0-797c-31d7-cb8c-2ff8.ngrok.io/subscription/confirmation",
        trialDays: 7,
        amount: 9.0,
        currencyCode: "USD",
        interval: "EVERY_30_DAYS",
        test: true,
      };
    }
    if (req.body.data === "monthly") {
      sub = {
        name: "Sizely Monthly Subscription",
        returnUrl:
          "https://b7dc-2601-805-c102-92b0-797c-31d7-cb8c-2ff8.ngrok.io/subscription/confirmation",
        amount: 9.0,
        currencyCode: "USD",
        interval: "EVERY_30_DAYS",
        test: true,
      };
    }
    if (req.body.data === "yearly") {
      sub = {
        name: "Sizely Yearly Subscription",
        returnUrl:
          "https://b7dc-2601-805-c102-92b0-797c-31d7-cb8c-2ff8.ngrok.io/subscription/confirmation",
        amount: 49.0,
        currencyCode: "USD",
        interval: "ANNUAL",
        test: true,
      };
    }
    console.log(req.body, sub);

    // Build your post request body.
    const body = {
      recurring_application_charge: {
        name: sub.name,
        price: sub.amount,
        return_url: sub.returnUrl,
        test: sub.test,
        trial_days: sub.trialDays,
      },
    };
    console.log(client, "BODY");

    // let DataType = {
    //   JSON,
    // };
    // Use `client.post` to send your request to the specified Shopify REST API endpoint.
    const data = await client.post({
      path: "recurring_application_charges",
      data: body,
      type: DataType.JSON,
    });

    let subID = data.body.recurring_application_charge.id;
    let subStatus = data.body.recurring_application_charge.status;

    await StoreModel.findOneAndUpdate(
      { shop: session.shop },
      {
        subscription: {
          id: subID,
          status: subStatus,
        },
      }
    );
    console.log(await StoreModel.find({ shop: session.shop }));
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

subscriptionRoutes.get("/confirmation", async (req, res) => {
  try {
    // const session = await Shopify.Utils.loadCurrentSession(req, res);
    // const client = new Shopify.Clients.Rest(session.shop, session.accessToken);

    // const { charge_id } = req.query;
    // const shop = session.shop;

    // const data = await client.get({
    //   path: "recurring_application_charges/" + charge_id,
    // });
    // const status = data.body.recurring_application_charge.status;

    // if (status === "active") {
    //   await StoreModel.findOneAndUpdate(
    //     { shop: shop },
    //     { subscription: { status: status } }
    //   );
    // }

    // do something with the returned data
    res.send(template());
  } catch (error) {
    console.log(error, "ERROR!");
  }
});

subscriptionRoutes.get("/remove", async (req, res) => {
  // do something with the returned data
  res.send(template());
});

subscriptionRoutes.get("/get", async (req, res) => {
  // do something with the returned data

  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const data = await client.get({
      path: "recurring_application_charges",
    });
    console.log(data);
    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
});

subscriptionRoutes.post("/remove", async (req, res) => {
  console.log(req.body);
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    let removal = await RecurringApplicationCharge.delete({
      session: session,
      id: req.body.data,
    });
    res.json({ data: removal });
  } catch (error) {
    console.log(error);
  }

  // const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
  // const removals = await client.delete({
  //   path: "recurring_application_charges/" + data[0],
  // });

  // console.log(removals);
});

export default subscriptionRoutes;
