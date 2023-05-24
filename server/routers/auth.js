const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/conn");
const Client = require("../models/clientSchema");

middleware = (req, res, next) => {
  console.log("Hello I am Middleware");
  next();
};

router.get("/", (req, res) => {
  res.send("Hello I am home page rendered by router");
});

router.get("/about", middleware, (req, res) => {
  res.send("Hello I am about page rendered by router");
});

router.get("/contact", (req, res) => {
  res.send("Hello I am contact page rendered by router");
});

router.get("/signin", (req, res) => {
  res.send("Hello I am signin page rendered by router");
});

router.post("/register", async (req, res) => {
  const { name, age, email, phone, password, cpassword } = req.body;

  if (!name || !age || !email || !phone || !password || !cpassword) {
    return res.status(422).json("Fill all fields");
  }

  if (password != cpassword) {
    return res.status(422).json("Password and Confirm Password does not match");
  }

  try {
    const userExist = await Client.findOne({ email: email });

    if (userExist) {
      return res.status(422).json("Already Registered");
    }

    const client = new Client({
      name,
      age,
      email,
      phone,
      password,
      cpassword,
    });

    const userRegister = await client.save();

    res.status(201).json("User registered successfully");
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Fill all fields");
    }

    const userSignIn = await Client.findOne({ email: email });

    if (userSignIn) {
      const pwdMatch = await bcrypt.compare(password, userSignIn.password);

      const token = await userSignIn.genAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 300000), // 5 mins
        httpOnly: true,
      });

      if (pwdMatch) {
        res.json("User login Successfull");
      } else {
        return res.status(422).json("Invalid Credentials");
      }
    } else {
      return res.status(422).json("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
