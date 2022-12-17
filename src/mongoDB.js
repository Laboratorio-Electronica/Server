// Mongo DB
const mongoose = require('mongoose');

const userMongo = process.env.USER_DB;
const passwordMongo = process.env.PASSWORD_DB;
const nameDB = 'laboratorio';
const URI = `mongodb+srv://${userMongo}:${passwordMongo}@data.6ep5zsp.mongodb.net/${nameDB}?retryWrites=true&w=majority`;

var users;

mongoose.set('strictQuery', true);

async function getUsers() {
    await mongoose.connect(URI)
        .then(() => console.log('Base de datos conectada'))
        .catch(e => console.error('error', e))

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



const user = require('../models/user')

module.exports = { getUsers }
