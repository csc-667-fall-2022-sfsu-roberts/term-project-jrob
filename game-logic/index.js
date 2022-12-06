const status = (game_id) => {
  // For each user
  // return {
  //   id: game_id,
  //   players: [
  //     { id: 1, avatar: "", username: "name", card_count: 5 },
  //     { id: 1, avatar: "", username: "name", card_count: 8 },
  //   ],
  //   hand: [{ id: 42 }, { id: 12 }, { id: 100 }, { id: 73 }, { id: 83 }],
  //   isMyTurn: false,
  // };

  // players: Array[{ id, username, card_count, current }]
  return Games.getPlayers(game_id)
    .then((players) =>
      Promise.all([
        players,
        ...players.map(({ id }) => userStatus(game_id, id)),
      ])
    )
    .then(([players, ...player_data]) => {
      // players: Array[{ id, username, card_count, current }]
      // player_data: Array[userStatus]
      // Assemble all this into the data:
      // { user_id: data_for_that_users, user_id: data_for_that_user}
    });
};

const userStatus = (game_id, user_id) => {
  return Promise.resolve({
    hand: [{ id: 42 }, { id: 12 }, { id: 100 }, { id: 73 }, { id: 83 }],
    isMyTurn: false,
  });
};

module.exports = { status };
