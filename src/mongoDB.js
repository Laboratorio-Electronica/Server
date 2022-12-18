const mongoose = require('mongoose');

const userMongo = process.env.USER_DB;
const passwordMongo = process.env.PASSWORD_DB;
const nameDB = process.env.NAME_DB;
const URI = `mongodb+srv://${userMongo}:${passwordMongo}@data.6ep5zsp.mongodb.net/${nameDB}?retryWrites=true&w=majority`;

const User = require('../models/user')
var users;

mongoose.set('strictQuery', true);

async function getUsers() {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(e => console.log(e))
    try {
        await User.find()
            .then(res => {
                users = res
            })
    } catch (err) {
        console.log(err)
    }
    return users
}

async function createUser(dataUser) {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(e => console.log(e))
    
    const newUser = new User(dataUser)

    try {
        newUser.save()
    } catch (error) {
        console.log(error)
    }

    // return 'correct'
}

module.exports = { getUsers, createUser }