const user = require("../models/user");
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../services/auth");

async function createUser(req, res) {
  const { name, email, password, mo, city, gender, dob } = req.body;

  const hashpasword = await bcrypt.hash(password, 10);
  // console.log(req.body);

  await user.create({
    name,
    email,
    password: hashpasword,
    mo,
    city,
    gender,
    dob,
    profile: `/images/${req.file.filename}`
  });
  return res.redirect("/user/login");
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    const result = await user.findOne({ email });

    const token = createTokenForUser(result);
    // console.log(token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    // console.error(error);
    return res.redirect("login", { error: "Invalid email or password" });
  }
}

module.exports = { createUser, userLogin };
