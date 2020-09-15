const db = require("../database/dbConfig");

async function addRecord(record) {
  return db("record").insert(record, "id").returning("*");
}

function findRecordByUser(user_id) {
  return db("record").select().where({ user_id });
}

async function update(user_id, body) {
  await db("record").where({ user_id }).update(body);

  return findRecordByUser(user_id);
}

module.exports = {
  addRecord,
  findRecordByUser,
  update,
};
