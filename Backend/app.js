const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./module/job/index");

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/v1/api",routes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
