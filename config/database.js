module.exports.pgLocal = {
    host: 'localhost',
    user: 'postgres',
    password: process.env.postgresPW,
    port: '5432',
    database: 'tracker'
}

module.exports.pgHeroku = {
    host: 'ec2-174-129-255-7.compute-1.amazonaws.com',
    user: 'pkvbncxlugjzmv',
    password: process.env.postgresPW,
    port: '5432',
    database: 'dap387s51amon5'
}
