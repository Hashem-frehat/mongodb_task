const Record = require("../models/record");

exports.createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find({ isDeleted: false });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecord = await Record.findByIdAndDelete(id);
    if (!deleteRecord)
      return res.status(404).json({ error: "Record not found" });
    res.status(200).json({ message: "record deleted sucsessfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updateRecord = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateRecord)
      return res.status(404).json({ error: "Record not found" });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.softDeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedRecord)
      return res.status(404).json({ error: "Record not found" });
    res.status(200).json({ message: "Record soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
