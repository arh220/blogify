const Blog = require("../models/blog");

async function createBlog(req, res) {
  //   console.log(req.body);
  //   console.log(req.file);
  const { title, body } = req.body;

  await Blog.create({
    title,
    body,
    coverImage: `/uploads/${req.file.filename}`,
    createdBy: req.user._id
  });

  return res.redirect("/");
}
module.exports = { createBlog };
