import axios from "axios";
const API_BASE_URL = "http://localhost:3000/logs";

/**
 * Fetch logs from the backend with optional filters.
 *
 * The filters object can include:
 * - level (error, warn, info, debug)
 * - message (full-text search)
 * - resourceId
 * - traceId
 * - spanId
 * - commit
 * - timestamp_start
 * - timestamp_end
 *
 * Example usage:
 *   getLogs({ level: 'error', resourceId: 'server-1' });
 */

export const getLogs = async (filters) => {
  const params = new URLSearchParams();

  // Add filters only if they have a value
  for (const key in filters) {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  }

  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (err) {
    console.error("Error fetching logs:", err);
    throw err;
  }
};

/**
 * Ingest a new log entry into the system.
 *
 * Expects a log object like:
 * {
 *   level: 'error',
 *   message: 'DB connection failed',
 *   resourceId: 'server-123',
 *   timestamp: '2023-10-02T08:00:00Z',
 *   traceId: 'abc-123',
 *   spanId: 'span-456',
 *   commit: 'a1b2c3',
 *   metadata: {
 *     parentResourceId: 'server-999'
 *   }
 * }
 */
export const createLog = async (log) => {
  try {
    const response = await axios.post(API_BASE_URL, log);
    return response.data;
  } catch (err) {
    console.error("Error creating log:", err);
    throw err;
  }
};
