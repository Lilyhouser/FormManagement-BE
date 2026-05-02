const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ROLE } = require("../constraints/role");
const { serverErrorMessageRes } = require("../helpers/serverErrorMessage");

const handleSignup = async (req, res) => {
  const { username, password } = req.body;

  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Email has existed!" });
  }

  try {
    const hashPass = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashPass,
      role: ROLE.STAFF,
    });

    return res.status(201).json({
      message: `Welcome ${username} as ${ROLE.STAFF}`,
    });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  const matchUser = await User.findOne({ username }).exec();

  if (!matchUser) {
    return res.status(401).json({
      message: "Email does not exist!",
    });
  }

  try {
    const compare = await bcrypt.compare(password, matchUser.password);
    if (!compare) {
      return res.status(401).json({ message: "Password is incorrect!" });
    }

    const refreshToken = jwt.sign(
      {
        username: matchUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    const accessToken = jwt.sign(
      {
        userId: matchUser._id,
        username: matchUser.username,
        role: matchUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    serverErrorMessageRes(res, error);
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.headers?.cookie;

  let refreshToken;
  cookies.split(";").forEach((cookie) => {
    const token = cookie.split("=")[0] === "jwt" ? cookie.split("=")[1] : "";
    if (token.length > 0) {
      refreshToken = token;
    }
  });

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  const username = req.username;
  const matchUser = await User.findOne({ username }).exec();

  if (!matchUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  res.sendStatus(204);
};

module.exports = {
  handleLogin,
  handleLogout,
  handleSignup,
};
