
exports.seed = function(knex) {
  return knex('pokemon').truncate()
    .then(function () {
      return knex('pokemon').insert([
        {name: 'squirtle'},
        {name: 'bulbasaur'},
        {name: 'charmander'}
      ]);
    });
};
