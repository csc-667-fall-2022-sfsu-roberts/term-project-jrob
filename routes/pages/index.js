const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
  response.render("public/index");
});

router.get("/login", function (request, response) {
  response.render("public/login");
});

router.get("/signup", function (request, response) {
  response.render("public/signup");
});

module.exports = router;
