# Log-Ingestion-and-Querying-System

# What this project does
This system allows you to:

Ingest log entries via a REST API

Filter logs in real-time using fields like level, message, resourceId, traceId, spanId, commit, and timestamps

Highlight matched keywords in the log list

View a log-level summary chart that updates in real-time (BONUS)

Switch between cyberpunk and Rust themes ( by default is cyberpunk)

Store and retrieve logs locally using a JSON file

Push new log entries to the frontend via WebSocket without needing to refresh (BONUS)

Maintain filters and UI state dynamically while new logs arrive



# Backend
Built using Express and AJV for schema validation

/logs endpoint for both POST (create) and GET (filter) operations

Logs are stored in a logs.json file for simplicity

WebSocket support using Socket.IO to push new logs to the frontend

Filtering supports:

Partial text match (case-insensitive)

Date range filtering 

Level, traceId, spanId, commit, resourceId

Validations are strict and follow the required schema

# Frontend
Built with React and Vite

UI includes:

Filter bar with debounce on message search

Realtime chart using Recharts (BONUS)

Realtime log list with highlight for matched filters

Theme toggle (cyberpunk / rust) (BONUS)

WebSocket client auto-receives new logs and updates the list (BONUS)

Clear filters button resets all fields including debounced input (BONUS)



# How to run the project locally
# Prerequisites (NODE 20 IS MANDATORY)
Node.js v20 installed

You can install using nvm install 20

Make sure nvm use 20 is active

npm installed



# Commands: (in root)
npm install

npm run build   

npm run start


# EXAMPLE JSON:
{
  "level": "error",
  "message": "Failed to connect to database.",
  "resourceId": "server-001",
  "timestamp": "2023-10-01T10:15:00Z",
  "traceId": "trace-err-123",
  "spanId": "span-err-001",
  "commit": "9a3f2d",
  "metadata": {
    "parentResourceId": "cluster-01"
  }
}

# INVALID LOG:
{
  "level": "fatal",                     // Invalid value (must be "error", "warn", "info", or "debug")
  "message": 404,                       // Invalid type (should be a string)
  "resourceId": "",                     // Invalid value (empty string is not useful)
  "timestamp": "15-10-2023 14:00",      // Invalid format (not ISO 8601)
  "traceId": null,                      // Invalid type (should be a string)
  "spanId": 12345,                      // Invalid type (should be a string)
  "commit": true,                       // Invalid type (should be a string)
  "metadata": {
    // Missing required field 'parentResourceId'
    "extra": "unexpected"
  },
  "extraField": "should be removed"     // additionalProperties not allowed
}

