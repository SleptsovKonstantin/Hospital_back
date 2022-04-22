module.exports = (app) => {
  const recordControllers = require("../controller/record.controller");
  const router = require("express").Router();

  router.post("/createRecord", recordControllers.createRecord);
  
  app.use("/api/records", router);
};
