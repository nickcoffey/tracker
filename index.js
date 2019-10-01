// App setup
const express = require('express')
const path = require('path')
const app = express()
var port = 3000

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

// Start app
app.listen(port, () => {logger.info(`App listen is listening on port ${port}`)})