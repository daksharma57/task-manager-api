// CRUD create read update delete 

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'    //127.0.0.1 is id of local host 127017 is the port 
const databaseName = 'task-manager'                 // Change this when you want to create a new project data

// const id = new ObjectID()   //As objectID is constgructor function so new is used
// console.log(id.id)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database !!')
    }

    const db = client.db(databaseName)


    //How to find or read in mongodb


    // db.collection('users').findOne({ _id: new ObjectID("6094fd2bec55bb0cf8bc2677") }, (error , user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     } 

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 12 }).toArray((error, users) => {  //find returns cursor function so we can use its property eg. toArray
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 12 }).count((error, users) => {
    //     console.log(users)
    // })

    // db.collection('task').find({ completed: false }).toArray((error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(task)
    // })



//How to inser a data


    // db.collection('users').insertOne({   //This user will be stored with the given data in task-manager file
    //     Name: 'Sush',
    //     Age: 21
    // }, (error ,result) => {
    //     if (error) {
    //         return console.log('Unable to insert user !')
    //     }
    //     console.log(result.ops)   //ops will print the users value given 
    // })


    // db.collection('users').insertMany([
    //     {
    //         name : 'jen',
    //         age: 14
    //     },
    //     {
    //         name: 'Aryan',
    //         age: 12
    //     }
    // ], (error , result) => {
    //     if (error) {
    //         return console.log('Unable to insert documments !')
    //     }
    //     console.log(result.ops)
    // })



    // db.collection('task').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed : true
    //         },
    //     {
    //         description: 'Renew inspetion',
    //         completed: false
    //     },
    //     {
    //         description: 'Pot Plants',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks !')
    //     }
    //     console.log(result.ops)
    // })



})