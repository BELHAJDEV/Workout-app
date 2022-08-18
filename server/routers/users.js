const authorization = require('../middlewar/authorization');
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const { User, ValidateUser} = require("../models/User");

router.post("/", async (req, res) => {
  const { error } = ValidateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send({error :"User already exist!"});

  user = new User(_.pick(req.body, ["username", "image", "email", "password"]));

  user.password = await bcrypt.hash(user.password, 10);

  user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token' , token)
  .send(_.pick(user, ["_id" ,"username" , "email", "image"]));
  
});


router.get('/me', authorization, async(req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);

})

module.exports = router;