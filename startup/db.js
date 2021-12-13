const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
module.exports = () => {
  mongoose
    .connect(process.env.db)
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database not connected", error.message));
};
