const router = require("express").Router();
const Product = require("../models/Product");
const verification = require("./verifyToken");
const CryptoJS = require("crypto-js");

router.post("/", verification.verifyTokenandAdmin, async (req, res) => {
  try {
    console.log(req.body);

    const newProduct = new Product(req.body);
    newProduct.save();
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verification.verifyTokenandAdmin, async (req, res) => {
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verification.verifyTokenandAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  let products;
  try {
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        catagories: { $in: [qCategory] },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    console.log();
    const product = await Product.findById(req.params.id );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
