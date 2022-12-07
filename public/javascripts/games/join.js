const table = document.querySelector("#game-table");
const discard = document.querySelector("#discard");

const updateDiscard = (card) => {
  const div = document.createElement("div");
  div.classList.add("card", `card-${card.type}`, `${card.color}`);
  div.dataset.cardId = card.id;

  discard.replaceChildren(div);
};

const getPlayerDiv = (seat, username, avatar, playerSeat, totalPlayers) => {
  const div = document.querySelector(`#players player-${seat}`);

  if (div === null) {
    const container = document.createElement("div");
    container.classList.add("player");

    if (playerSeat === seat) {
      container.classList.add("player-current");
    } else {
      container.classList.add(
        `player-minus-${(playerSeat + seat) % totalPlayers}`
      );
    }

    const playerName = document.createElement("div");
    playerName.classList.add("username");
    container.appendChild(playerName);

    const userAvatar = document.createElement("img");
    userAvatar.setAttribute("src", `//gravatar.com/avatar/${avatar}?s=50`);
    userAvatar.setAttribute("alt", username);
    userAvatar.setAttribute("title", username);
    playerName.appendChild(userAvatar);

    const hand = document.createElement("div");
    hand.classList.add("hand");
    container.appendChild(hand);

    table.appendChild(container);
    return container;
  } else {
    return div;
  }
};

const getPlayerCardDiv = (seat, username, avatar, playerSeat, totalPlayers) => {
  const container = getPlayerDiv(
    seat,
    username,
    avatar,
    playerSeat,
    totalPlayers
  );

  return container.querySelector(".hand");
};

const updatePlayer = (
  player_id,
  player_seat,
  { id, username, avatar, seat, card_count },
  hand,
  isMyTurn,
  totalPlayers
) => {
  const div = getPlayerCardDiv(
    seat,
    username,
    avatar,
    player_seat,
    totalPlayers
  );

  if (id === player_id) {
    div.replaceChildren(
      ...hand.map((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", `card-${card.type}`, `${card.color}`);

        if (isMyTurn) {
          cardDiv.addEventListener("click", () => {
            console.log("Clicked on card", card.id);
          });
        }

        return cardDiv;
      })
    );
  } else {
    const cards = document.createDocumentFragment();
    const cardBack = document.createElement("div");
    cardBack.classList.add("card", "special");

    for (let i = 0; i < card_count; i++) {
      cards.appendChild(cardBack.cloneNode(true));
    }

    div.replaceChildren(...Array.from(cards.childNodes));
  }
};

const updateGame = (data) => {
  console.log("Game data from update", data);

  const { id, player_id, players, isMyTurn, hand, discard } = data;

  if (!table.classList.contains(`player-count-${players.length}`)) {
    table.classList.add(`player-count-${players.length}`);
  }

  updateDiscard(discard);

  const player_seat = players.find((player) => player.id === player_id).seat;

  players.forEach((player) =>
    updatePlayer(player_id, player_seat, player, hand, isMyTurn, players.length)
  );
};

fetch(window.location.pathname, { method: "post" })
  .then((r) => r.json())
  .then(({ game_id }) => {
    socket.on(`game:${game_id}:player-joined`, ({ count, required_count }) => {
      document.querySelector("span.current-count").innerHTML = count;

      if (count === required_count) {
        document.querySelector("p#waiting").classList.add("hidden");
        document.querySelector("#game-table").classList.remove("hidden");
        document
          .querySelector("#game-table")
          .classList.add(`player-count-${count}`);
      }
    });

    socket.on(`game:${game_id}:update`, updateGame);
  })
  .then(() => {
    fetch(`${window.location.pathname}/status`, { method: "post" });
  });
