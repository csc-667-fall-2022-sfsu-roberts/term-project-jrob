const db = require("./index");

const CREATE_SQL = "INSERT INTO games (title) VALUES (${title}) RETURNING id";

const CHECK_USER_IN_GAME_SQL =
  "SELECT * FROM game_users WHERE user_id=${user_id} AND game_id = ${game_id}";

const ADD_USER_SQL =
  "INSERT INTO game_users (game_id, user_id) VALUES (${game_id}, ${user_id}) RETURNING game_id";

const ACTIVE_GAMES =
  "SELECT id, title FROM games LEFT JOIN game_users ON games.id = game_users.game_id WHERE game_users.user_id=${user_id}";

const JOINABLE_GAMES =
  "SELECT * FROM games WHERE id NOT IN (" +
  "SELECT id FROM games LEFT JOIN game_users ON games.id = game_users.game_id WHERE game_users.user_id=${user_id}" +
  ")";

const COUNT_USERS_IN_GAME =
  "SELECT COUNT(*) FROM game_users WHERE game_id = ${game_id}";

const GAME_INFO = "SELECT * FROM GAMES WHERE id = ${game_id}";

const create = (user_id, title = "") => {
  return db
    .one(CREATE_SQL, { title })
    .then(({ id: game_id }) => addUser(user_id, game_id));
};

const addUser = (user_id, game_id) => {
  return db
    .none(CHECK_USER_IN_GAME_SQL, { user_id, game_id })
    .then(() => db.one(ADD_USER_SQL, { user_id, game_id }));
};

const active = (user_id) => db.any(ACTIVE_GAMES, { user_id });

const joinable = (user_id) => db.any(JOINABLE_GAMES, { user_id });

const all = (user_id) =>
  Promise.all([active(user_id), joinable(user_id)]).then(
    ([active, joinable]) => ({ active, joinable })
  );

const info = (game_id) => db.one(GAME_INFO, { game_id });
const userCount = (game_id) => db.one(COUNT_USERS_IN_GAME, { game_id });

module.exports = { create, all, addUser, userCount, info };
