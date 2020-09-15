const express = require("express");
const db = require("../database/dbConfig");
const restricted = require("../auth/restricted-middleware.js");
const recordModel = require("./record-model");
const router = express.Router({
  mergeParams: true,
});

router.post("/new", async (req, res, next) => {
  try {
    const record = await recordModel.addRecord({ ...req.body });
    if (record) {
      res.status(201).json({
        message: "record created",
      });
    } else {
      res.status(500).json({
        message: "Error saving record, please try again later",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
