import { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import LogList from "./components/LogList";
import { getLogs } from "./api/logsApi";
import "./App.css";
import LogStatsChart from "./components/LogStatsChart";
import io from "socket.io-client";
import ThemeToggle from "./components/ThemeToggler";

// Seting up socket connection
const socket = io("http://localhost:3000");

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
    traceId: "",
    spanId: "",
    commit: "",
  });

  // Fetching logs when filters change
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await getLogs(filters);
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [filters]);

  // Listen for real-time new logs
  useEffect(() => {
    const handleNewLog = (newLog) => {
      // Ignore the new log if it doesn't match current filters
      const matchesFilters = () => {
        const msg = filters.message?.toLowerCase();
        return (
          (!filters.level || newLog.level === filters.level) &&
          (!filters.message || newLog.message.toLowerCase().includes(msg)) &&
          (!filters.resourceId ||
            newLog.resourceId
              .toLowerCase()
              .includes(filters.resourceId.toLowerCase())) &&
          (!filters.traceId ||
            newLog.traceId
              .toLowerCase()
              .includes(filters.traceId.toLowerCase())) &&
          (!filters.spanId ||
            newLog.spanId
              .toLowerCase()
              .includes(filters.spanId.toLowerCase())) &&
          (!filters.commit ||
            newLog.commit
              .toLowerCase()
              .includes(filters.commit.toLowerCase())) &&
          (!filters.timestamp_start ||
            newLog.timestamp >= filters.timestamp_start) &&
          (!filters.timestamp_end || newLog.timestamp <= filters.timestamp_end)
        );
      };

      if (matchesFilters()) {
        setLogs((prev) => [newLog, ...prev]);
      }
    };

    socket.on("new-log", handleNewLog);

    return () => socket.off("new-log", handleNewLog);
  }, [filters]);

  return (
    <div className="app-container">
      <ThemeToggle />
      <h1>Log Query System</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      {loading ? (
        <div className="loading">Loading logs...</div>
      ) : (
        <>
          <LogStatsChart logs={logs} />
          <LogList logs={logs} filters={filters} />
        </>
      )}
    </div>
  );
}

export default App;
