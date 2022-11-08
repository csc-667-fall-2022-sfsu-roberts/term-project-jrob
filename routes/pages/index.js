const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const { sessionID } = request;
  const { username } = request.session;

  console.log({ username });

  response.render("public/index", { username, sessionID });
});

module.exports = router;
