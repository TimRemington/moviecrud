exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, title: 'Aliens', director: 'James Cameron', year: 1986, rating: 5},
        {id: 2, title: 'Blade Runner 2049', director: 'Denis Villeneuve', year: 2017, rating: 5},
        {id: 3, title: 'The Thing', director: 'John Carpenter', year: 1982, rating: 5},
        {id: 4, title: 'Interview with the Vampire', director: 'Neil Jordan', year: 1994, rating: 4},
        {id: 5, title: 'The Big Lebowski', director: 'Coen Brothers', year: 1998, rating: 5},
        {id: 6, title: 'Plan 9 From Outer Space', director: 'Ed Wood', year: 1959, rating: 1},
        {id: 7, title: 'Memento', director: 'Christopher Nolan', year: 2000, rating: 5},

      ])
      .then(function() {
        // Moves id column (PK) auto-incrementer to correct value after inserts
        return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
      })
    });
};
