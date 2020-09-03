const db = require("../database/dbConfig.js");
const bcrypt = require("bcryptjs");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "email");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  return db("users").insert(user, "id").returning("*");
}

function findById(id) {
  return db("users").select("id", "email").where({ id }).first();
}
