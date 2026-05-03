const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
    data: {
      type: Object,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Submission", SubmissionSchema);
