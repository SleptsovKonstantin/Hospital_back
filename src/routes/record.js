module.exports = (app) => {
  const recordControllers = require("../controller/record.controller");
  const router = require("express").Router();

  router.post("/createRecord", recordControllers.createRecord);
  router.get("/findAllRecord", recordControllers.findAllRecord);
  router.patch("/updateRecord", recordControllers.updateRecord);
  router.delete("/deleteOneRecord", recordControllers.deleteOneRecord);
  router.post("/sortRecords", recordControllers.sortRecords);
  router.get("/filterRecords", recordControllers.filterRecords);
  

  app.use("/api/records", router);
};
