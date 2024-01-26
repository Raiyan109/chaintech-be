const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'You can not keep the title empty']
    },
    status: {
        type: String,
        default: ""
    },
    desc: String,
    dueTask: String
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)