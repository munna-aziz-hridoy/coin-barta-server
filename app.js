const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const dbConfig = require("./config/dbConfig");

const adminRouter = require("./routers/admin");
const categoryRouter = require("./routers/category");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.options("*", cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const run = async () => {
  try {
    app.use("/api/v1/admin", adminRouter);
    app.use("/api/v1/categories", categoryRouter);
  } catch {}
};
run().catch(console.dir);

module.exports = app;
