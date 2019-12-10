module.exports.pgLocal = {
    host: 'localhost',
    user: 'postgres',
    password: process.env.postgresPW,
    port: '5432',
    database: 'tracker'
}

module.exports.pgAWS = {
    host: 'tracker-db.cvsyojwbt8yt.us-east-2.rds.amazonaws.com',
    user: 'postgres',
    password: process.env.postgresPW,
    port: '5432',
    database: 'tracker'
}
