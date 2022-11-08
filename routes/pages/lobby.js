const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  const { username, userId } = request.session;

  response.render("protected/lobby", { username, userId });
});

module.exports = router;
