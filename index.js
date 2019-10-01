// App setup
const express = require('express')
const path = require('path')
const app = express()
var port = 3000
const config = require('./config/database')

// CORS Setup
const cors = require('cors')
app.use(cors());

// Body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Logger setup
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'TRACE'
module.exports.logger = logger

// DB setup
const mlab = config.mlab
const mongoose = require('mongoose')
module.exports.mongoose = mongoose
const Schema = mongoose.Schema
module.exports.Schema = Schema
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
const connection = mongoose.connect(`mongodb://${mlab.user}:${mlab.password}@${mlab.host}:${mlab.port}/${mlab.database}`, (err, db) => {
    if(err){
        logger.error('DB connection failed', err)
    } else {
        logger.info('DB connection successful')
    }
})

// Routes
app.use('/api/category', require('./routes/categoryRoutes'))

// Start app
app.listen(port, () => {logger.info(`App listen is listening on port ${port}`)})