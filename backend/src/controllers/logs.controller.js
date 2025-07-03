const express = require("express");
const router = express.Router();
const logsService = require("../services/logs.services");
const { validateLog } = require("../utils/schema");

router.post("/logs", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Body cannot be empty" });
    }

    const { isValid, errors } = validateLog(req.body);

    if (!isValid) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors
          .map((err) => `${err.instancePath} ${err.message}`)
          .join(", "),
      });
    }

    const savedLog = await logsService.createLog(req.body);
    res.status(201).json(savedLog);
    const io = req.app.get("io");
    io.emit("new-log", savedLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/logs", async (req, res) => {
  try {
    const filters = req.query;
    const logs = await logsService.getLogs(filters);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
