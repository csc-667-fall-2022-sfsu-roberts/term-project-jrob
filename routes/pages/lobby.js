const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
  response.render("protected/lobby");
});

module.exports = router;
