import { useState, useEffect } from "react";
import { format, subDays } from "date-fns";
import useDebounce from "../hooks/useDebounce";

/**
 * FilterBar Component
 * - Provides UI controls to filter logs by level, message, resourceId, etc.
 * - Debounces the message input to avoid frequent API calls.
 */

const FilterBar = ({ filters, setFilters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.message);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Update message filter when searchTerm changes (using debounce)

  useEffect(() => {
    setFilters((prev) => ({ ...prev, message: debouncedSearchTerm }));
  }, [debouncedSearchTerm, setFilters]);

  // Sets the timestamp range based on number of days

  const handleDateChange = (days) => {
    const endDate = new Date();
    const startDate = subDays(endDate, days);
    setFilters({
      ...filters,
      timestamp_start: startDate.toISOString(),
      timestamp_end: endDate.toISOString(),
    });
  };

  return (
    <div className="filter-bar">
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
        {" "}
        <label>Span ID:</label>
        <input
          type="text"
          value={filters.spanId || ""}
          onChange={(e) => setFilters({ ...filters, spanId: e.target.value })}
          placeholder="Filter by Span ID"
        />
      </div>
      <div className="filter-group">
        {" "}
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
    </div>
  );
};

export default FilterBar;
