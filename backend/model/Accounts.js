const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Accounts', AccountSchema)