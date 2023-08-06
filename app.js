require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");
const allRouter = require("./routes");
const { Server } = require("socket.io");
const http = require("http");
const app = express();

// check db
db.then(() => {
  console.log("database terkoneksi");
}).catch((err) => {
  console.log(err);
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(allRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log("taraaa mak jreng");
  socket.on("message_function", (data) => {
    console.log(data);
    socket.emit("reply_function", { reply: data.message });
  });

  socket.on("join_room", (data) => {
    console.log("join to room", data.konsulId);
    socket.join(data.konsulId);
  });
  socket.on("send_message", (data) => {
    console.log("cekks", data);
    socket.emit("receive_message", { message: data.message });
  });
  socket.on("send_message_to", (data) => {
    console.log("send to", data.konsulId, data.sender, data.message);
    io.in(data.konsulId).emit("receive_message", {
      sender: data.sender,
      message: data.message,
      konsulId: data.konsulId,
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log("server running on http://localhost:" + process.env.PORT);
});
