module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller");
  const router = require("express").Router();
  const passwordCheck = require("../middleware/upload");

  router.post("/create", passwordCheck, tutorialControllers.create);
  router.post("/login", tutorialControllers.login);
  router.get("/findAll", tutorialControllers.findAll);
  router.delete("/deleteOne", tutorialControllers.deleteOne);

  app.use("/api/user", router);
};
