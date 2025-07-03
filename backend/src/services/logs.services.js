const fs = require("fs");
const path = require("path");
const { LOG_FILE_PATH } = require("../config/constants");

// method to fetch files from json
const getLogsFromFile = () => {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) return [];
    const data = fs.readFileSync(LOG_FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading logs:", err);
    return [];
  }
};

// method to write in the json
const saveLogsToFile = (logs) => {
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
};

// method to create a log which will be added to json file in memory
exports.createLog = (log) => {
  const logs = getLogsFromFile();
  logs.push(log);
  saveLogsToFile(logs);
  return log;
};


// fetching logs

exports.getLogs = (filters) => {
  let logs = getLogsFromFile();

  if (filters.level) {
    logs = logs.filter((log) => log.level === filters.level);
  }

  if (filters.message) {
    const searchTerm = filters.message.toLowerCase();
    logs = logs.filter((log) => log.message.toLowerCase().includes(searchTerm));
  }

  if (filters.resourceId) {
    const searchTerm = filters.resourceId.toLowerCase();
    logs = logs.filter((log) =>
      log.resourceId.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.traceId) {
    const searchTerm = filters.traceId.toLowerCase();
    logs = logs.filter((log) => log.traceId.toLowerCase().includes(searchTerm));
  }

  if (filters.spanId) {
    const searchTerm = filters.spanId.toLowerCase();
    logs = logs.filter((log) => log.spanId.toLowerCase().includes(searchTerm));
  }

  if (filters.commit) {
    const searchTerm = filters.commit.toLowerCase();
    logs = logs.filter((log) => log.commit.toLowerCase().includes(searchTerm));
  }

  if (filters.timestamp_start && filters.timestamp_end) {
    logs = logs.filter(
      (log) =>
        log.timestamp >= filters.timestamp_start &&
        log.timestamp <= filters.timestamp_end
    );
  }

  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return logs;
};
