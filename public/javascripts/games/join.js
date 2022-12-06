// Set up socket connection
// 1. Player joined updates

fetch(window.location.pathname, { method: "post" })
  .then((r) => r.json())
  .then(({ game_id, user_id }) => {
    socket.on(`game:${game_id}:player-joined`, ({ count, required_count }) => {
      document.querySelector("span.current-count").innerHTML = count;

      if (count === required_count) {
        document.querySelector("p#waiting").classList.add("hidden");
        document.querySelector("#game-table").classList.remove("hidden");
      }
    });
  });
