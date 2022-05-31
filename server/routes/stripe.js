const router = require("express").Router();
const { STRIPE_SECRET_KEY } = require("../config");

const stripe = require("stripe")(STRIPE_SECRET_KEY);

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

module.exports = router;
