const db = require('../../data/db-config');

function getAll() {
  return db('pokemon');
}

function getById(id) {
  return db('pokemon').where('id', id).first();
}

function insert(pokemon) {
  return null
}

function remove(id) {
  return null
}

module.exports = {
  getAll,
  getById,
  insert,
  remove
}