exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.timestamps(true, true)
    table.string('title').notNullable().defaultTo('')
    table.string('director').notNullable().defaultTo('')
    table.integer('year').notNullable()
    table.integer('rating').notNullable()
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies')
}
