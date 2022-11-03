const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        require: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    }
})

userSchema.set('toJSON', {
    transform(document, returnedObject) {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)