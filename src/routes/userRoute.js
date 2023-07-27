const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/userController");
const { check } = require("express-validator");
const auth = require("../middlewere/auth");

router.route("/register").post(
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  register
);

router.route("/login").post(
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  login
);

router.route("/logout").post(auth, logout);

module.exports = router;
