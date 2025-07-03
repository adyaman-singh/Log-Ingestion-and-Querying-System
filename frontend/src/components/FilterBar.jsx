import { useState, useEffect } from "react";
import { subDays } from "date-fns";
import useDebounce from "../hooks/useDebounce";
import { createLog } from "../api/logsApi";

/**
 * FilterBar Component
 * - Provides UI controls to filter logs by level, message, resourceId, etc.
 * - Debounces the message input to avoid frequent API calls.
 * - Also includes a log generator for testing/demo purposes.
 */
const FilterBar = ({ filters, setFilters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.message);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedLevel, setSelectedLevel] = useState("info");
  const [customMessage, setCustomMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, message: debouncedSearchTerm }));
  }, [debouncedSearchTerm, setFilters]);

  const handleDateChange = (days) => {
    const endDate = new Date();
    const startDate = subDays(endDate, days);
    setFilters({
      ...filters,
      timestamp_start: startDate.toISOString(),
      timestamp_end: endDate.toISOString(),
    });
  };

  // Default sample messages, you can also send your own message
  const sampleMessages = {
    error: "Database connection failed.",
    warn: "High memory usage detected.",
    info: "User signed in successfully.",
    debug: "Cache lookup completed.",
  };

  const generateSampleLog = async () => {
    const now = new Date().toISOString();
    const level = selectedLevel;

    const log = {
      level,
      message: customMessage || sampleMessages[level],
      resourceId: `demo-service-${level}`,
      timestamp: now,
      traceId: `trace-${Math.random().toString(36).slice(2, 8)}`,
      spanId: `span-${Math.random().toString(36).slice(2, 8)}`,
      commit: Math.random().toString(36).substring(2, 8),
      metadata: {
        parentResourceId: `parent-${level}`,
      },
    };

    try {
      setIsGenerating(true);
      await createLog(log);
    } catch (err) {
      console.error("Failed to generate log:", err);
      alert("Something went wrong while generating the log.");
    } finally {
      setIsGenerating(false);
      setCustomMessage("");
    }
  };

  return (
    <div className="filter-bar">
      {/* Filtering Controls */}
      <div className="filter-group">
        <label>Log Level:</label>
        <select
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">All</option>
          <option value="error">Error</option>
          <option value="warn">Warning</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Search Message:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search log messages..."
        />
      </div>

      <div className="filter-group">
        <label>Resource ID:</label>
        <input
          type="text"
          value={filters.resourceId}
          onChange={(e) =>
            setFilters({ ...filters, resourceId: e.target.value })
          }
          placeholder="Filter by Resource ID"
        />
      </div>

      <div className="filter-group">
        <label>Trace ID:</label>
        <input
          type="text"
          value={filters.traceId || ""}
          onChange={(e) => setFilters({ ...filters, traceId: e.target.value })}
          placeholder="Filter by Trace ID"
        />
      </div>

      <div className="filter-group">
        <label>Span ID:</label>
        <input
          type="text"
          value={filters.spanId || ""}
          onChange={(e) => setFilters({ ...filters, spanId: e.target.value })}
          placeholder="Filter by Span ID"
        />
      </div>

      <div className="filter-group">
        <label>Commit:</label>
        <input
          type="text"
          value={filters.commit || ""}
          onChange={(e) => setFilters({ ...filters, commit: e.target.value })}
          placeholder="Filter by Commit"
        />
      </div>

      <div className="filter-group">
        <label>Time Range:</label>
        <div className="time-buttons">
          <button onClick={() => handleDateChange(1)}>Last 24h</button>
          <button onClick={() => handleDateChange(7)}>Last 7d</button>
          <button onClick={() => handleDateChange(30)}>Last 30d</button>
        </div>
      </div>

      {/* Clear All Filters */}
      <div className="filter-group">
        <label>Clear Filters:</label>
        <button
          className="clear-btn"
          onClick={() => {
            setFilters({
              level: "",
              message: "",
              resourceId: "",
              traceId: "",
              spanId: "",
              commit: "",
              timestamp_start: "",
              timestamp_end: "",
            });
            setSearchTerm("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Log Generator Section */}
      <div className="filter-group">
        <label>Generate Sample Log:</label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="error">Error</option>
          <option value="warn">Warn</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
        <input
          type="text"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Optional custom message"
          style={{ marginTop: "5px" }}
        />
        <button
          className="clear-btn"
          onClick={generateSampleLog}
          disabled={isGenerating}
          style={{ marginTop: "6px" }}
        >
          {isGenerating ? "Generating..." : "Generate Log"}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
