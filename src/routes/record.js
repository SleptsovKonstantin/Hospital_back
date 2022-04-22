module.exports = (app) => {
  const router = require("express").Router();
  const recordControllers = require("../controller/record.controller");

  router.post("/createRecord", recordControllers.createRecord);
  
  app.use("/api/records", router);
};
