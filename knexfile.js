module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/crud_movie'
  },
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
