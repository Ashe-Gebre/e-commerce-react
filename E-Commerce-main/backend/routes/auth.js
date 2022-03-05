const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET
  ).toString();
  const newUser = new User({ ...req.body, password });
  try {
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json("Wrong Credential!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );

    const pass = hashedPassword.toString(CryptoJS.enc.Utf8);
    pass !== req.body.password && res.status(401).json("Wrong Credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others,accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
