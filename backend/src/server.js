const app = require("./app");
const fs = require("fs");
const http = require("http");
const { LOG_FILE_PATH } = require("./config/constants");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

if (!fs.existsSync(LOG_FILE_PATH)) {
  fs.writeFileSync(LOG_FILE_PATH, "[]");
}

const server = http.createServer(app); // socket uses raw http server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
