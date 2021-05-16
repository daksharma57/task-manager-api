require('../src/db/mongoose')
const User = require('../src/moodels/user')

// 609680a56abc861a94615a62
// User.findByIdAndUpdate('609680a56abc861a94615a62' , { age: 21}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 21})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id , age) => {
    const user = await User.findByIdAndUpdate(id , { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('609680a56abc861a94615a62' , 20).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})