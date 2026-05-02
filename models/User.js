const mongoose = require("mongoose");
const { ROLE } = require("../constraints/role");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require,
      unique: true,
    },
    password: {
      type: String,
      require,
    },
    role: {
      type: String,
      default: ROLE.ADMIN,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
