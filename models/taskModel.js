const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: String,
    status: {
        type: String,
        default: ""
    },
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)