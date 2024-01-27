const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const Task = require('./models/taskModel.js')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    const tasks = await Task.find()

    if (!tasks) {
        return res.status(400).json({ msg: 'No Task found' })
    }

    res.status(200).json({
        success: true,
        data: tasks
    })
})

app.post('/create', async (req, res) => {
    const { name, status, desc, dueTask } = req.body

    try {
        const task = await Task.create({ name, status, desc, dueTask })

        if (!task) {
            return res.status(400).json({ msg: 'No Task can be created' })
        }

        res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {

        return res.status(400).json({ msg: error.message })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({
                msg: `No task with id :${id}`
            });
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(400).json({ msg: 'No Task can be deleted' })
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Deleted'
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, status, desc, dueTask } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({
                msg: `No task with id :${id}`
            });

        const task = await Task.findByIdAndUpdate(id, {
            name,
            status,
            desc,
            dueTask
        })

        if (!task) {
            return res.status(400).json({ msg: 'No Task can be updated' })
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            data: task
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
})

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({
                msg: `No task with id :${id}`
            });
        const task = await Task.findById(id)

        if (!task) {
            return res.status(400).json({ msg: 'No Task found by this id' })
        }

        res.status(200).json({
            success: true,
            message: task
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
})

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log(`Server listening on ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
