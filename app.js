const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')



mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => logger.error('Error connecting to MongoDB:', error.message))

app.use(cors)
app.use(express.json())

app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)

module.exports = app