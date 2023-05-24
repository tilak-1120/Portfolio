const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
PORT = process.env.PORT;

require("./db/conn");
// const Client = require("./models/clientSchema");
app.use(express.json());

app.use(require("./routers/auth"));

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
