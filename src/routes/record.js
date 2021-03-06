module.exports = (app) => {
  const router = require("express").Router();
  const recordControllers = require("../controller/record.controller");

  router.post("/createRecord", recordControllers.createRecord);
  router.get("/findAllRecord", recordControllers.findAllRecord);
  router.patch("/updateRecord", recordControllers.updateRecord);
  router.delete("/deleteOneRecord", recordControllers.deleteOneRecord);
  router.post("/sortRecords", recordControllers.sortRecords);
  router.post("/filterRecords", recordControllers.filterRecords);
  
  app.use("/api/records", router);
};
