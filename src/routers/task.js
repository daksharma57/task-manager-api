const express = require('express')
const Task = require('../models/task') 
const auth = require('../middleware/auth') 
const router = new express.Router()



router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//GET /tasks?completed=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:desc  (_ asc for accending)
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'   // If this is true this will set the whole term(completed) true , otherwise false , we can't write = Bolean as it is a string of true or false
    }

    if(req.query.sortBy) {
       const parts = req.query.sortBy.split(':')
       sort[parts[0]] = parts[1] === 'desc' ? -1 : 1      //part[0] == first object in part  , -1 for desc and 1 for acc
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // {
                //     createdAt: -1  //(=1 for accending)
                //     completed: -1
                // }
            }
        }).execPopulate()   // const tasks = await Task.find({ owner: req.user._id }) 
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id   //We don't need to wory as mongoose converts id into param so no need to put objectid as in mongodb


    try {
        const task = await Task.findOne({ _id , owner: req.user._id })

        if (!task) {  // If the task really exsists or not to check this
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})



router.patch('/tasks/:id', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        // updates.forEach((update) => task[update] = req.body[update] )

        // await task.save()

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router