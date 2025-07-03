import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * - Renders a bar chart showing number of logs per log level
 * - Uses Recharts for simple visualization
 */

const LogStatsChart = ({ logs }) => {
  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(levelCounts).map(([level, count]) => ({
    level,
    count,
  }));

  return (
    <div style={{ height: 200, marginBottom: "2rem" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="level" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="grey" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogStatsChart;
