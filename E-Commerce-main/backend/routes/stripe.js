const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
      console.log(req.body);
    let response = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
