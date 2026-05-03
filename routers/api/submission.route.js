const express = require("express");
const router = express.Router();
const {
  getAllSubmissions,
} = require("../../controllers/submission.controller");

router.get(
  "/",
  // #swagger.tags = ['Submission']
  // #swagger.security = [{ "bearerAuth": [] }]
  // #swagger.summary = 'Get all submissions'
  // #swagger.description = 'Retrieve all submissions by MongoDB ObjectId. The user must be authenticated and the form must be active.'
  getAllSubmissions,
);

module.exports = router;
