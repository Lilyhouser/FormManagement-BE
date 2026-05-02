const { getRoleNameByKey } = require("../constraints/role");
const { checkValidRole } = require("../helpers/checkValidRole");
const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params?.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unexpected error, no ID retrieved from current user",
      });
    }
    const user = await User.findById(userId).select().lean();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

const addUserByAdmin = async (req, res) => {
  if (!req.body?.username || !req.body?.password || !req.body?.role) {
    return res.status(403).json({
      success: false,
      message: "Email, password and role are required!",
    });
  }

  const { username, password, role } = req.body;
  if (!checkValidRole(role)) {
    return res.status(403).json({
      success: false,
      message: "The role is not valid!",
    });
  }

  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res.status(409).json({
      success: false,
      message: "Email has existed!",
    });
  }

  try {
    const hashPass = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashPass,
      role,
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${username} as ${role}`,
    });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

module.exports = {
  getUsers,
  addUserByAdmin,
  getUserById,
};
