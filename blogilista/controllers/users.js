const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const passwordHash = await bcrypt.hash(body.password, config.PASSWORD_SALT_ROUNDS)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response
        .status(201)
        .json(savedUser)
})

module.exports = usersRouter