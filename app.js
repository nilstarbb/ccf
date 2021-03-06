const config = require("./utils/config");
const express = require("express");
// require("express-async-errors");
const app = express();
const cors = require("cors");

const tripsRouter = require("./controllers/trips");
const deliverysRouter = require("./controllers/deliverys");

// const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/trips", tripsRouter);
app.use("/api/deliverys", deliverysRouter);

app.get("/", (req, res) => {
  res.send(`<p>Trip & Delivery API</p>`);
});

module.exports = app;