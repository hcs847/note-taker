const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// const fs = require("fs");
const path = require("path");
// const { notes } = require("./db/db.json");
const express = require("express");
// const uuid = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// set static path
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
