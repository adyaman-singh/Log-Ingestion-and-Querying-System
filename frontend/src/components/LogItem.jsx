/**
 * LogItem Component
 * - Displays a single log entry with its metadata
 * - Visually styled based on the log level (error, warn, info, debug)
 */


const LogItem = ({ log }) => {
  return (
    <li className={`log-item ${log.level}`}>
      <div className="log-header">
        <span className="log-level">{log.level.toUpperCase()}</span>
        <span className="log-timestamp">
          {new Date(log.timestamp).toLocaleString()}
        </span>
        <span className="log-resource">{log.resourceId}</span>
      </div>
      <div className="log-message">{log.message}</div>
      <div className="log-meta">
        <span>Trace: {log.traceId}</span>
        <span>Span: {log.spanId}</span>
        <span>Commit: {log.commit}</span>
      </div>
    </li>
  );
};

export default LogItem;
