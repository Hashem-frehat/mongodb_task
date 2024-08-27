const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  isDeleted: { type: Boolean, default: false },
  progres: { type: String, default: "in progress" },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
