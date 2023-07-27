const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

module.exports = async function(req, res, next) {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Auth Error - user not looged in" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('uerr----',decoded.user.id);
    const user = await User.findOne({_id: decoded.user.id})
    if (!user) return res.status(401).json({ message: "Invalid Token"})
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};