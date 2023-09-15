const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [`${proccess.env.URL_FRONT}`],
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.send("It works!");
});

// Connect to MongoDB using async/await
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MDB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

// Call the connectToDatabase function to connect to MongoDB
connectToDatabase();

//set up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));
