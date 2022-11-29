const express = require("express");
const router = express.Router();
const Games = require("../../db/games");

router.post("/create", (request, response) => {
  const { userId } = request.session;
  const { title = "" } = request.body;

  Games.create(userId, title)
    .then(({ game_id }) => {
      response.redirect(`/games/${game_id}`);

      request.app.io.emit("game:created", {
        game_id,
        title,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/join", (request, response) => {
  const { userId } = request.session;
  const { id } = request.params;

  Games.addUser(userId, id)
    .then(() => {
      response.redirect(`/games/${id}`);
    })
    .catch((error) => {
      console.log({ error });
    });
});

module.exports = router;
