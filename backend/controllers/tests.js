const testsRouter = require("express").Router();

testsRouter.get("/", (request, response) => {
  Test.find({}).then((tests) => {
    response.json(tests);
  });
});

testsRouter.post("/", (request, response) => {
  const test = new Test(request.body);

  Test.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = testsRouter;
