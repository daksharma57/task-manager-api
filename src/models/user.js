const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid !")
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain pasword')
                }
            }

        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a positive number !')
                }
            }
        },
        tokens: [{  //This token array will manage login per device from a single user
            token: {
                type: String,
                required: true
            }
        }] , 
        avatar: {
            type: Buffer
        }
    } , {
            timestamps: true
    }
)

userSchema.virtual('tasks' , {   // This doesn't esists just for mongoose to get who owns what 
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()      //.toObject will give raw profile data

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })   //Saving token to for user login as per a device each 
    await user.save()

    return token
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })   //Here email is short for email: email

    if (!user) {
        throw new Error('Unable to login !')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error("Wrong Password !!")
    }

    return user
}


//Hash the plain text password before saving
userSchema.pre('save', async function (next) {   // we dont use arrow function as they don't bind the method pre used in 
    const user = this    // this gives us access to all users

    if (user.isModified('password')) {   //Only hash the password if the user updates the password
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delete user's task if the user is deleted
userSchema.pre('remove' , async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
     
})

const User = mongoose.model('User', userSchema)

module.exports = User












// const bcrypt = require('bcrypt')

// const myFunction = async () => {
//     const password = 'Red123!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red123!' , hashedPassword)
//     console.log(isMatch)
// }


// userSchema.methods.getPublicProfile = function()  {
//     const user = this
//     const userObject = user.toObject()  //.toObject will give raw profile data

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }