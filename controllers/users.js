const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', (request, response) => {
    User.find({})
        .then(users => {
            response.json(users)
        })
        .catch(exception => {
            console.log(exception)
            response.status(500).json({
                error: "Something went wrong in the database."
            })
        })
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body
    const existing_user = await User.findOne({ username })
    if (existing_user) {
        return response.status(400).json({
            error: "Username is already taken."
        })
    }

    const passwordHash = bcrypt.hash(password, 10)

    const new_user = new User({ username, passwordHash, name })
    const saved_user = await new_user.save()

    response.status(201).json(saved_user)
})