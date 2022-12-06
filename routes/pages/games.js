const express = require("express");

const router = express.Router();
const Games = require("../../db/games");

router.post("/:id", (request, response) => {
  const { id: game_id } = request.params;
  const { user_id } = request.session;

  response.json({ game_id, user_id });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;

  Promise.all([Games.userCount(id), Games.info(id)])
    .then(([{ count }, { title }]) => {
      console.log(count);
      response.render("protected/game", {
        id,
        title,
        count,
        required_count: 2,
        ready: parseInt(count) === 2,
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send();
    });
});

router.get("/:id/:message", (request, response) => {
  const { id, message } = request.params;

  response.render("protected/game", { id, message });
});

module.exports = router;
