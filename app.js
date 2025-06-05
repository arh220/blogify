const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");
const blogRouter = require("./routes/blogRouter");
const cookieParser = require("cookie-parser");
const { checkForAuthcookie } = require("./middlware/auth");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/blogify")
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

app.listen(8001, () => console.log("server started..."));
