const express = require("express");
const router = express.Router();

router.get("/:id", function (request, response) {
  const { id } = request.params;

  response.render("protected/game", { id });
});

router.get("/:id/:message", function (request, response) {
  const { id, message } = request.params;

  response.render("protected/game", { id, message });
});

module.exports = router;
