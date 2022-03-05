const router = require("express").Router();
const User = require("../models/User");
const verification = require("./verifyToken");
const CryptoJS = require("crypto-js");

router.put(
  "/:id",
  verification.verifyTokenandAuthorization,
  async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString();
    }

    try {
      let updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedUser);
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
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.get("/", verification.verifyTokenandAdmin, async (req, res) => {
  console.log(req.query);

  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/find/:id", verification.verifyTokenandAdmin, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", verification.verifyTokenandAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
