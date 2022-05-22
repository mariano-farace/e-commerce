const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_URL, PORT } = require("./config");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
// TODO install nodemon as dev dependency
// TODO add multer and helmet
// TODO reestructurar los folders para dividirlos mejor
// TODO hacer validacion de datos, con tipo y longitud
// TODO Usar Redis
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/v1/test", (req, res) => {
  console.log("successful test");
  res.send("successful test");
});

// TODO modificar para usar singular en las rutas
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.listen(PORT || 3000, () => {
  console.log("Server running on port 3000");
});
