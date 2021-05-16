const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'    
const databaseName = 'task-manager' 

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database !!')
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //         name: 'Aryan'
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    db.collection('task').deleteOne({
        description : "Clean the house"
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })



    //Update
    // db.collection('task').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.matchedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("6094fd2bec55bb0cf8bc2678")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })
    
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})