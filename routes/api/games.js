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

router.post("/:id/play", (request, response) => {
  const { userId } = request.session;
  const { id } = request.params;

  // Check that the user is in the game
  // If not, ignore

  // Check that its the users turn
  // If not, ignore

  // Check the card that is being played is held by the user
  // If not, broadcast an error to user

  // Check the card that is being played is a valid play
  // If not, broadcast an error to user

  // If all of that is true, update game state and broadcast
  // Remove the card from user's hand
  // Add card to discard pile
  // Change current user
  // Broadcast game state
});

module.exports = router;
