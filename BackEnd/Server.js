const express = require("express");
require("dotenv").config();
const app = express();
const taskRoutes = require("./routes/taskRoutes");

const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log("path " + req.path + " method " + req.method);
  next();
});
// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "DB connected Successfully and listening to " + process.env.PORT
      );
    });
  })
  .catch((error) => console.log(error));
app.use("/api/tasks", taskRoutes);
