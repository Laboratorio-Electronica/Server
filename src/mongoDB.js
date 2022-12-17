const mongoose = require('mongoose');

const userMongo = process.env.USER_DB;
const passwordMongo = process.env.PASSWORD_DB;
const nameDB = process.env.NAME_DB;
const URI = `mongodb+srv://${userMongo}:${passwordMongo}@data.6ep5zsp.mongodb.net/${nameDB}?retryWrites=true&w=majority`;

const user = require('../models/user')
var users;

mongoose.set('strictQuery', true);

async function getUsers() {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connect with Data base'))
        .catch(e => console.log(e))

    try {
        const arrayUsers = await user.find()
            .then(res => {
                users = res
            })
    } catch (error) {
        console.log(error)
    }

    return users
}

module.exports = { getUsers }