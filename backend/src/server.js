const app = require("./app");
const fs = require("fs");
const http = require("http");
const { LOG_FILE_PATH } = require("./config/constants");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

if (!fs.existsSync(LOG_FILE_PATH)) {
  fs.writeFileSync(LOG_FILE_PATH, "[]");
}

const server = http.createServer(app); // ✅ wrap express app
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make Socket.IO instance accessible to routes
app.set("io", io);

// ✅ Start the server (important!)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
