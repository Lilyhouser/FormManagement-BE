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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Submission", SubmissionSchema);
