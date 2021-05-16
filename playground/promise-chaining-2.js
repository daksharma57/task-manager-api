require('../src/db/mongoose')
const Task = require('../src/moodels/task')

// Task.findByIdAndDelete('609672fb8d788d356c4ba310').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id ) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('6096887c35a67c2198d160b0').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})