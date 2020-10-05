const express = require("express");
const db = require("../database/dbConfig");
const restricted = require("../auth/restricted-middleware.js");
const betModel = require("./bets-model");
const router = express.Router({
  mergeParams: true,
});

// PRODUCT ROUTES
router.get("/all/:userId", async (req, res, next) => {
  try {
    const bets = await betModel.findBetByUser(req.params.userId);
    res.status(200).json(bets);
  } catch (err) {
    next(err);
  }
});

router.get("/:sport/:userId", async (req, res, next) => {
  try {
    const bets = await betModel.findBetByUser(req.params.userId);
    const filtered = bets.filter((bet) => bet.sport === req.params.sport);
    res.status(200).json(filtered);
  } catch (err) {
    next(err);
  }
});

router.post("/new", restricted, async (req, res, next) => {
  try {
    const bet = await betModel.addBet({ ...req.body });
    if (bet) {
      res.status(201).json({
        message: "Bet post created",
      });
    } else {
      res.status(500).json({
        message: "Error saving bet, please try again later",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/bets/:id", async (req, res, next) => {
  try {
    const bet = await db("bet").where({ id: req.params.id }).first();

    res.status(200).json(bet);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// router.put("/bets/:id", restricted, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const bet = await mpModel.update(id, req.body);

//     if (bet) {
//       res.json(bet);
//     } else {
//       res.status(404).json({
//         message: "Could not find a bet with the given ID",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/bets/:id", restricted, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const delBet = await mpModel.remove(id);

//     if (delBet) {
//       res.status(204).json({
//         message: "Bet deleted",
//       });
//     } else {
//       res.status(404).json({
//         message: "Could not find a bet with given ID",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });
