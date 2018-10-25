module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/crud_movie'
  },
  test: {},
  production: {
    client: 'pg',
    connection: 'postgres://sgbizhlzinahsl:30d26db6d03806b38d8918395b5f4f4db4972ccf12f1c55801a5c52e8656ec15@ec2-54-225-115-234.compute-1.amazonaws.com:5432/d6qdu7dioppnqo'
  }
}
