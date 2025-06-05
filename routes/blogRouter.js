const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createBlog } = require("../controllers/blog");
const Blog = require("../models/blog");
const Comment = require("../models/comments");
const { comentUser } = require("../controllers/coment");

router.get("/add-blog", (req, res) => {
  return res.render("addblog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
  console.log(comments);

  return res.render("blog", { user: req.user, blog, comments });
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post("/", upload.single("coverImage"), createBlog);

router.post("/comment/:blogId", comentUser);

module.exports = router;
