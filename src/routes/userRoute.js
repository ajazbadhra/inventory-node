module.exports = (app) => {
  const { register, login, logout } = require("../controllers/userController");
  const { check } = require("express-validator");
  const auth = require("../middlewere/auth");
  
  app.route("/register").post(
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6,
      }),
    ],
    register
  );
  
  app.route("/login").post(
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6,
      }),
    ],
    login
  );
  
  app.route("/logout").post(auth, logout);
}