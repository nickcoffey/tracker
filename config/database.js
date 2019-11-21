module.exports.pg_local = {
    host: 'localhost',
    user: 'postgres',
    password: process.env.PG_PW,
    port: '5432',
    database: 'tracker'
}