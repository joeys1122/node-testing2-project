const db = require('../../data/db-config');

function getAll() {
  return db('pokemon');
}

function getById(id) {
  return db('pokemon').where('id', id);
}

function insert(pokemon) {
  return db('pokemon').insert(pokemon)
    .then(([id]) => {
      return getById(id).first();
    });
}

function remove(id) {
  return db('pokemon').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  insert,
  remove
}