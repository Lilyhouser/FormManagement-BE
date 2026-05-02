const express = require("express");
const {
  handleLogin,
  handleLogout,
  handleSignup,
} = require("../controllers/auth.controller");
const { checkRequiredFields } = require("../middlewares");
const verifyJwt = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/logout").post(
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Logout'
  handleLogout,
);

router.use(checkRequiredFields("username", "password"));
router.route("/login").post(
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Login'
  handleLogin,
);

router.route("/signup").post(
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Singup'
  handleSignup,
);
module.exports = router;
