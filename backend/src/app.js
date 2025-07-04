const express = require("express");
const cors = require("cors");
const logsRouter = require("./controllers/logs.controller");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", logsRouter);

module.exports = app;
