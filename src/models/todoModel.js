const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["Instagram", "Twitter", "Facebook", "TikTok", "Other"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    payment: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Draft", "Scheduled", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
