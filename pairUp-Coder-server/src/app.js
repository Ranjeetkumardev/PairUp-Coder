const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing; limit it in production
    methods: ["GET", "POST"],
  },
});

dotenv.config()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const Message = require("./models/Message");
const mongoose =  require("mongoose")
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


 
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Fetch previous messages
  socket.on('fetchMessages', async ({ userId }) => {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: socket.userId },
        { sender: socket.userId, receiver: userId }
      ]
    }).sort({ createdAt: -1 }).limit(50); // Adjust limit as needed
    socket.emit('previousMessages', messages);
  });

  // Send a new message
  socket.on('sendMessage', async (message) => {
    try {
      if (!mongoose.isValidObjectId(message.sender)) {
        throw new Error("Invalid sender ObjectId");
      }

      const newMessage = new Message({
        content: message.content,
        sender: message.sender,
        receiver: message.receiverId,
        status: 'sent',
      });

      await newMessage.save();
      io.emit('newMessage', newMessage); // Emit to all connected clients
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });

  