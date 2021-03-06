const router = require("express").Router();

const Users = require("../users/users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require("../auth/check-role-middleware.js");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err, "here"));
});

router.get("/:id", restricted, checkRole("User"), (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.send(err, "here"));
});

module.exports = router;
