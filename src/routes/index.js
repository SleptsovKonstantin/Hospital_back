module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller");
  const router = require("express").Router();
  const passwordCheck = require("../middleware/upload");

  router.post("/create", passwordCheck, tutorialControllers.create);
  router.post("/login", tutorialControllers.login);

  app.use("/api/user", router);
};
