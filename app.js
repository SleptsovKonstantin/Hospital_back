require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/models");

app.use(cors());
app.use(express.json());

require("./src/routes/index")(app);
require("./src/routes/record")(app);

db.sequelize.sync();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});
