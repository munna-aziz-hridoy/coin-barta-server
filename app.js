const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { cloudinary } = require("./utilities/cloudinary");

const dbConnection = require("./config/dbConfig");

const adminRouter = require("./routers/admin");
const categoryRouter = require("./routers/category");
const newsRouter = require("./routers/news");
const commentRouter = require("./routers/comment");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.options("*", cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
dbConnection();
const run = async () => {
  try {
    app.use("/api/v1/admin", adminRouter);
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/news", newsRouter);
    app.use("/api/v1/comments", commentRouter);
    app.post("/testUpload", async (req, res) => {
      try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: "dev-setups",
        });
        res.send({ data: uploadResponse });
      } catch (err) {
        console.log(err);
      }
    });
  } catch {}
};
run().catch(console.dir);

module.exports = app;
