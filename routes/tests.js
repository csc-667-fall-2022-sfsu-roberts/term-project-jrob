const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (request, response) => {
  db.any(
    `INSERT INTO test_table ("testString") VALUES ('Hello at ${Date.now()}')`
  )
    .then((_) => db.any(`SELECT * FROM test_table`))
    .then((results) => response.render("tests.hbs", { results }))
    .catch((error) => {
      console.log(error);
      response.json({ error });
    });
});
module.exports = router;
