module.exports = (app) => {
  const recordControllers = require("../controller/record.controller");
  const router = require("express").Router();

  router.post("/create", recordControllers.create);
  // router.get("/findAll", recordControllers.findAll);
  // router.delete("/deleteOne", recordControllers.deleteOne);
  // router.get("/findTitle", tutorialControllers.findTitle);
  // router.get("/filter", tutorialControllers.filter);
  // router.get("/sort", tutorialControllers.sort);
  // router.get("/pagination", tutorialControllers.pagination);
  // router.get("/paginationSort", tutorialControllers.paginationSort);
  // router.get("/value", tutorialControllers.value);

  app.use("/api/records", router);
};
