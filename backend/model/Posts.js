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
        type: String
    },
    body: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Posts', PostSchema)