/**
 * LogList Component
 * - Displays a list of log entries with color-coded levels
 * - Supports keyword highlighting in message, traceId, spanId, commit, and resourceId
 */

const LogList = ({ logs, filters }) => {
  // Return a color based on the log level
  const getLevelColor = (level) => {
    switch (level) {
      case "error":
        return "red";
      case "warn":
        return "orange";
      case "info":
        return "blue";
      case "debug":
        return "green";
      default:
        return "gray";
    }
  };
  
  // Highlight matched keyword within a string (case-insensitive)
  const highlightMatch = (text, keyword) => {
    if (!keyword || typeof text !== "string") return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        )
      );
  };

  return (
    <div className="log-list">
      {logs.length === 0 ? (
        <div className="no-logs">No logs found matching your filters</div>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index} className={`log-item ${log.level}`}>
              <div className="log-header">
                <span
                  className="log-level"
                  style={{ color: getLevelColor(log.level) }}
                >
                  {log.level.toUpperCase()}
                </span>
                <span className="log-timestamp">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span className="log-resource">
                  {highlightMatch(log.resourceId, filters.resourceId)}
                </span>
              </div>

              <div className="log-message">
                {highlightMatch(log.message, filters.message)}
              </div>

              <div className="log-meta">
                <span>
                  Trace: {highlightMatch(log.traceId, filters.traceId)}
                </span>
                <span>Span: {highlightMatch(log.spanId, filters.spanId)}</span>
                <span>
                  Commit: {highlightMatch(log.commit, filters.commit)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LogList;
