# Log-Ingestion-and-Querying-System

# What this project does
This system allows you to:

Ingest log entries via a REST API

Filter logs in real-time using fields like level, message, resourceId, traceId, spanId, commit, and timestamps

Highlight matched keywords in the log list

View a log-level summary chart that updates in real-time

Switch between light and dark themes

Store and retrieve logs locally using a JSON file

Push new log entries to the frontend via WebSocket without needing to refresh

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

Realtime chart using Recharts

Realtime log list with highlight for matched filters

Theme toggle (cyberpunk / rust)

WebSocket client auto-receives new logs and updates the list

Clear filters button resets all fields including debounced input



# How to run the project locally
# Prerequisites
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
