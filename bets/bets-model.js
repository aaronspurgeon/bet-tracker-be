const db = require("../database/dbConfig");

function findById(id) {
  return db("bet").where({ id }).first();
}

async function update(id, body) {
  await db("bet").where({ id }).update(body);

  return findById(id);
}

function remove(id) {
  return db("bet").where({ id }).del();
}

function findBetByUser(user_id) {
  return db("bet").select().where({ user_id });
}

function findBetBySport(user_id, sport) {
  const all = db("bet").select().where({ user_id });
  console.log(all);
  //   return all.filter((sport) => all.sport === sport);
}

function addBet(bet) {
  return db("bet").insert(bet, "id").returning("*");
}

module.exports = {
  findById,
  update,
  remove,
  findBetByUser,
  addBet,
  findBetBySport,
};
