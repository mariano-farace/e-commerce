import { STRIPE_SECRET_KEY } from "../config";
import express from "express";
import Stripe from "stripe";
const router = express.Router();

// TODO comprobar que la configuracion apiVesion sea correcta
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "eur",
    },
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200)(response);
      }
    }
  );
});

export default router;
