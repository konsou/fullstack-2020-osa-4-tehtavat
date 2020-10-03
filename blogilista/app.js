// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true) // suppresses a warning - see https://mongoosejs.com/docs/deprecations.html

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const config = require('./utils/config')


mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app