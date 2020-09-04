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

function findBetByUser(users_id) {
  return db("bet").select().where({ user_id });
}

module.exports = {
  findById,
  update,
  remove,
  findBetByUser,
};
