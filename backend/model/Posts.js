const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    className: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    courseNum: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)