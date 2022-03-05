const router = require("express").Router();

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const verification = require("./verifyToken");

router.post("/", verification.verifyToken, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    newCart.save();
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(
  "/:id",
  verification.verifyTokenandAuthorization,
  async (req, res) => {
    try {
      let updatedCart = await Cart.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete(
  "/:id",
  verification.verifyTokenandAuthorization,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/", verification.verifyTokenandAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(
  "/find/:userId",
  verification.verifyTokenandAuthorization,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);



module.exports = router;
