const router = require("express").Router();
const bcrypt = require("bcryptjs");

const tokenService = require("../auth/token-service.js");
const Users = require("../users/users-model.js");

router.post("/register", async (req, res, next) => {
  // let user = req.body;
  // const hash = bcrypt.hashSync(user.password, 10);
  // user.password = hash;

  // Users.add(user, "id")
  //   .then(saved => {
  //     res.status(201).json(saved);
  //   })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });
  try {
    const saved = await Users.add(req.body, "id");

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          roles: token.roles,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
