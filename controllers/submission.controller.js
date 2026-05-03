const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");
const Submission = require("../models/Submission");

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

module.exports = {
  getAllSubmissions,
};
