const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.get("/", (request, response) => {
  const { username, userId } = request.session;

  Games.all(userId)
    .then((games) => {
      response.render("protected/lobby", { username, userId, games });
    })
    .catch((error) => {
      console.log(error);
      response.redirect("error");
    });
});

module.exports = router;
