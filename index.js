const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/carts");
const emailRoutes = require("./routes/checkout");
const historieRoute = require("./routes/histories");
const http = require("http");
// const conversationRoute = require("./routes/conversation");
// const messageRoute = require("./routes/messages");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const chatRoutes = require("./routes/Chat");
//DBUrl
const DBUrl = `${process.env.MONGO_DB_URL}`;

// CORS;
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3006",
      "https://e-com-client.netlify.app",
      "https://e-com-admin.netlify.app",
    ],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

//upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + ".jpg");
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).any("files"));
//static file
app.use("/images", express.static(path.join(__dirname, "images")));

//parse body
app.use(bodyParser.json());
//----s
//session
// const store = new MongoDBStore({
//   uri: DBUrl,
//   collection: "session",
// });

// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60,
//     },
//   })
// );
//--

//users routes
app.use("/users", authRoutes);
//products routes
app.use("/products", productRoutes);
// carts routes
app.use("/carts", cartRoutes);
// send mail
app.use("/email", emailRoutes);

// history order
app.use("/histories", historieRoute);

// // conversation
// app.use("/conversations", conversationRoute);
// //message
// app.use("/messages", messageRoute);

// chat route
app.use("/chatrooms", chatRoutes);
//connect DB

const server = http.createServer(app);
mongoose.connect(DBUrl).then(() => {
  console.log("DB connected");
  server.listen(process.env.PORT || 5000);
  const io = require("./socket").init(server);
  io.on("connection", (socket) => {
    console.log("Client connected!");
    socket.on("send_message", (data) => {
      console.log("add message!", data);
      io.emit("receive_message_server", { data });
    });
    socket.on("send_message_server", (data) => {
      console.log("Server add message!", data);
      io.emit("receive_message", { data });
    });
  });
});

//handle error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
