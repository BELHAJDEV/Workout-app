const { User, isEmailAndPassword } = require("../models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const { error } = isEmailAndPassword(res.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: "User Not Found" });

  const passwordValid = await bcrypt.compare(password, user.password);
  
  if (!passwordValid)
    return res.status(400).send({ error: "Invalid Email or Password !" });

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
