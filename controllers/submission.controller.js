const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");
const Submission = require("../models/Submission");

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.userId })
      .populate("formId", "title")
      .sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

module.exports = {
  getAllSubmissions,
};
