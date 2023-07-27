const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      password,
      phoneNumber,
      companyName,
      address,
      city,
      state,
      gstNo,
      bankName,
      accountNumber,
      ifsc,
      branchName,
    } = req.body;

    let existingUser = await User.findOne({
      email,
    });

    if (existingUser)
      return res.status(400).json({
        message: "User already Exist",
      });

    const pass = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: pass,
      phoneNumber,
      companyName,
      address,
      city,
      state,
      gstNo,
      bankName,
      accountNumber,
      ifsc,
      branchName,
    });
    await user.save();
    console.log("User created");
    res.status(200).json({ data: "user created successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) throw err;
        user.token = token;
        user.save();
        console.log("User logged in")
        res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    jwt.sign({}, process.env.SECRET_KEY , { expiresIn: 1 }, async (logout, err) => {
        if (err) throw err;
        const user = await User.findById(req.user.id);
        user.token = ""
        user.save()
        console.log("User Logged out");
        res.json({ message: "Logged Out successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, logout };
