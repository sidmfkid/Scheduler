import Shopify from "@shopify/shopify-api";

const TEST_GRAPHQL_QUERY = `
{
  shop {
    name
  }
}`;

const verifyRequest = (app, { returnHeader = true } = {}) => {
  return async (req, res, next) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);

    let { shop, host } = req.query;
    if (session && shop && session.shop !== shop) {
      return res.redirect(`/auth?shop=${shop}&host=${host}`);
    }

    //session.isActive() doesn't work when using custom session storage.
    const isSessionActive = (session) => {
      if (!session) {
        return false;
      } else {
        return (
          Shopify.Context.SCOPES.equals(session.scope) &&
          session.accessToken &&
          (!session.expires || session.expires >= new Date())
        );
      }
    };

    if (isSessionActive(session)) {
      try {
        const client = new Shopify.Clients.Graphql(
          session.shop,
          session.accessToken
        );
        await client.query({ data: TEST_GRAPHQL_QUERY });
        return next();
      } catch (e) {
        if (
          e instanceof Shopify.Errors.HttpResponseError &&
          e.response.code === 401
        ) {
          res.redirect(`/auth?shop=${shop}`);
        } else {
          throw e;
        }
      }
    }

    if (returnHeader) {
      if (!shop) {
        if (session) {
          shop = session.shop;
        } else if (Shopify.Context.IS_EMBEDDED_APP) {
          const authHeader = req.headers.authorization?.match(/Bearer (.*)/);
          if (authHeader) {
            const payload = Shopify.Utils.decodeSessionToken(authHeader[1]);
            shop = payload.dest.replace("https://", "");
          }
        }
      }

      if (!shop || shop === "") {
        return res
          .status(400)
          .send(
            `Could not find a shop to authenticate with. Make sure you are making your XHR request with App Bridge's authenticatedFetch method.`
          );
      }

      res.status(403);
      res.header("X-Shopify-API-Request-Failure-Reauthorize", "1");
      res.header(
        "X-Shopify-API-Request-Failure-Reauthorize-Url",
        `/auth?shop=${shop}`
      );
      res.end();
    } else {
      res.redirect(`/auth?shop=${shop}&host=${host}`);
    }
  };
};

export default verifyRequest;
