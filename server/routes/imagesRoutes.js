import Shopify, { DataType } from "@shopify/shopify-api";
import express from "express";
import template from "../../template";
const imagesRoutes = express.Router();

imagesRoutes.get("/", async (req, res) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // GraphQLClient takes in the shop url and the accessToken for that shop.
    const client = new Shopify.Clients.Graphql(
      session.shop,
      session.accessToken
    );
    console.log(req.query, "query!");
    // Use client.query and pass your query as `data`

    const files = await client.query({
      data: {
        query: `query GetFiles($first: Int!) {
          files (first: $first) {
            edges {
              cursor
              node {
               createdAt
               alt
               ... on MediaImage{
                  id
               originalSource{
                  fileSize
               }
               image {
                  id
                  url
                  width
                  height
               }
               }
              }
            },
            pageInfo{
              hasNextPage
              hasPreviousPage
            }
          }
        }`,
        variables: {
          first: 250,
        },
      },
    });

    console.log("files.body.data.files", files.body.data.files);
    res.json({ data: files.body.data.files });
  } catch (error) {
    console.log(error, "ERROR loasing");
  }
});

imagesRoutes.get("/before", async (req, res) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    // GraphQLClient takes in the shop url and the accessToken for that shop.
    const client = new Shopify.Clients.Graphql(
      session.shop,
      session.accessToken
    );
    console.log(req.query, "query!");
    // Use client.query and pass your query as `data`

    if (req.query.page !== undefined) {
      console.log(req.query.page);
      const files = await client.query({
        data: {
          query: `query GetFiles($last: Int!, $before: String!) {
            files (last: $last, before: $before) {
              edges {
                cursor
                node {
                 createdAt
                 alt
                 ... on MediaImage{
                    id
                 originalSource{
                    fileSize
                 }
                 image {
                    id
                    url
                    width
                    height
                 }
                 }
                }
              },
              pageInfo{
                hasNextPage
                hasPreviousPage
              }
            }
          }`,
          variables: {
            last: 6,
            before: req.query.page,
          },
        },
      });
      console.log("files.body.data.files.edges", files.body.data.files);
      res.json({
        data: files.body.data.files,
      });
    } else {
      const files = await client.query({
        data: {
          query: `query GetFiles($first: Int!) {
              files (first: $first) {
                edges {
                  cursor
                  node {
                   createdAt
                   alt
                   ... on MediaImage{
                      id
                   originalSource{
                      fileSize
                   }
                   image {
                      id
                      url
                      width
                      height
                   }
                   }
                  }
                },
                pageInfo{
                  hasNextPage
                  hasPreviousPage
                }
              }
            }`,
          variables: {
            first: 250,
          },
        },
      });
      console.log("files.body.data.files.edges", files.body.data.files);
      res.json({
        data: files.body.data.files,
      });
    }

    // console.log("files.body.data.files", files.body.data.files);
  } catch (error) {
    console.log(error, "ERROR loasing");
  }
});
export default imagesRoutes;
