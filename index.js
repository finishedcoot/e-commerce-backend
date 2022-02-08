const express = require("express");
require("dotenv").config();
const auth = require("./routes/auth");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");
const orderRoute = require("./routes/orderRoutes");

const app = express();
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
mongoose
  .connect(dbUrl)
  .then(() => console.log("DB Connection successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", auth);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
