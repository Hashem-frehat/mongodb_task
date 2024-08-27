const express = require("express");
const {
  createRecord,
  getRecords,
  deleteRecord,
  updateRecord,
  softDeleteRecord,
} = require("../controllers/recordController");

const router = express.Router();

router.post("/save", createRecord);
router.get("/", getRecords);
router.delete("/:id", deleteRecord);
router.put("/:id", updateRecord);
router.patch("/:id/soft-delete", softDeleteRecord);

module.exports = router;
