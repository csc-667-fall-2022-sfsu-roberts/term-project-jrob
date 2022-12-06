// Set up socket connection
// 1. Player joined updates

fetch(window.location.pathname, { method: "post" })
  .then((r) => r.json())
  .then(({ game_id, user_id }) => {
    socket.on(`game:${game_id}:player-joined`, (data) => {
      document.querySelector("span.current-count").innerHTML = data.count;
      console.log("Player joined", data);
    });
  });
