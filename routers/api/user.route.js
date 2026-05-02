const express = require("express");
const {
  addUserByAdmin,
  getUsers,
  getUserById,
} = require("../../controllers/user.controller");
const verifyRoles = require("../../middlewares/roleMiddleware");
const { ROLE } = require("../../constraints/role");
const router = express.Router();

router.use(verifyRoles(ROLE.ADMIN));
router
  .route("/")
  .get(
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Get all users'
    getUsers,
  )
  .post(
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Add new user by admin'
    addUserByAdmin,
  );
router.route("/:id").get(
  // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Get an user by id'
  getUserById,
);

module.exports = router;
