const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");
const blogRouter = require("./routes/blogRouter");
const cookieParser = require("cookie-parser");
const { checkForAuthcookie } = require("./middlware/auth");
require('dotenv').config()

const mongoose = require("mongoose");
const { env } = require("process");

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB connected..."))
  .catch(Error => console.log(Error));

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthcookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRouter);
app.use("/", staticRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log("server started..."));
