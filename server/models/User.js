require("dotenv").config();
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      image: this.image,
    },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const ValidateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10).required(),

    image: Joi.string(),

    email: Joi.string().min(5).max(255).required().email(),

    password: Joi.string().min(5).max(1024).required(),
    
    
  });

  return schema.validate(user);
};

const isEmailAndPassword = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),

    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
};

module.exports = {
  User,
  ValidateUser,
  isEmailAndPassword,
};
