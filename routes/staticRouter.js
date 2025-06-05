const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", async (req, res) => {
  // if (!req.user) return res.redirect("/user/login");
  const allblogs = await Blog.find({});
  res.render("home", { user: req.user, blogs: allblogs });
});

module.exports = router;
