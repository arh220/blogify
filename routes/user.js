const express = require("express");
const { createUser, userLogin } = require("../controllers/user");
const router = express.Router();
const multer = require("multer");
const path = require("path");

router.get("/reg", (req, res) => {
  return res.render("reg");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
router.post("/reg", upload.single("profile"), createUser);

router.post("/login", userLogin);

module.exports = router;
