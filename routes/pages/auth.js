const express = require("express");
const Users = require("../../db/users");

const router = express.Router();

router.get("/login", (_request, response) => {
  response.render("public/login");
});

const handleLogin =
  (request, response) =>
  ({ id, username }) => {
    request.session.authenticated = true;
    request.session.userId = id;
    request.session.username = username;

    response.redirect("/lobby");
  };

const handleLoginError = (response, redirectUri) => (error) => {
  console.log({ error });
  response.redirect(redirectUri);
};

router.post("/login", (request, response) => {
  const { username, password } = request.body;

  Users.login({ username, password })
    .then(handleLogin(request, response))
    .catch(handleLoginError(response, "/auth/login"));
});

router.get("/register", (_request, response) => {
  response.render("public/register");
});

router.post("/register", (request, response) => {
  const { username, password } = request.body;

  Users.register({ username, password })
    .then(handleLogin(request, response))
    .catch(handleLoginError(response, "/auth/register"));
});

module.exports = router;
