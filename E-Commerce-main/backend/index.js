const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const verifyToken = require("./routes/verifyToken").verifyToken;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const stripeRouter = require("./routes/stripe");

dotenv.config();
const dbUrl = process.env.MONGO_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("DBConnection Successful"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", stripeRouter);

app.listen(process.env.port || 5000, () => {
  console.log("App started on port 5000");
});
