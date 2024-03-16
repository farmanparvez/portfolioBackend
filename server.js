const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config({ path: "./config.env"})
const app = require("./app");

const db = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD)
console.log(process.env.NODE_ENV)
mongoose.connect(db)
  .then((res) => console.log("database is connect to: " + res.connection.host))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 9000;

app.listen(PORT, (_, res) => console.log("app is running on port " + PORT));
