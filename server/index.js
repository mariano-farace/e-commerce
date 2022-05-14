const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_URL, PORT } = require("./config");
const userRouter = require("./routes/user");

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

app.use("/api/v1/user", userRouter);

app.listen(PORT || 3000, () => {
  console.log("Server running on port 3000");
});