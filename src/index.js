const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT  //|| 3000


app.use(express.json())  //This will parse the incommind data
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})




// app.use((req , res , next) => { 
//     if(req.method === 'GET') {
//         res.send("GET requests are disabled")
//     } else {
//         next()
//     }
// })

// app.use((req , res , next) => {
//         res.status(503).send("Service is temporarly unavailable. We will be back soon")
// })




// const jwt = require('jsonwebtoken')

// const myFunction = async () => {   //To make jwt tokens 
//     const token =  jwt.sign({ _id: '123aa' } , 'thisismynewcourse' , { expiresIn: '7 days' }) 
//     console.log(token)


//     const data = jwt.verify(token , 'thisismynewcourse')   //to verify jwt token
//     console.log(data)
// }
// myFunction()

const Task = require('./models/task')
const User = require('./models/user')



// if (!file.originalname.endsWith('.pdf')) {
//     return cb(new Error('File must be a pdf file !'))
// }



// const multer = require('multer')
// const upload = multer({
//     dest: 'images' ,   //This is destination
//     limits: {
//         fileSize: 1000000  // in bytes , this is 1mb = 1000000bytyes
//     }, 
//     fileFilter(req , file , cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {   // This is called as  regular  expression
//             return cb(new Error('File must be a word file !'))
//         }
//         cb(undefined , true)

//         // cb(new Error('File must be a pdf file !'))
//         // cb(undefined , true)     // undefined for Error and true for getting the task done
//         // cb(undefined , false)
//     }
// })
// app.post('/upload' , upload.single('upload') , (req , res) => {
//     res.send()
// }, (error , req , res , next) => {
//     res.status(400).send({ error: error.message })  //We defined a special function for calling for as upload is other function and we want to catch its error so we used a middleware function for that , this is used to tell express for any uncaught error
// })
