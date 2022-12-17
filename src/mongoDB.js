// Mongo DB
const mongoose = require('mongoose');

const userMongo = 'KrlozMedina';
const passwordMongo = 'PNj99mXR1ryVDBgz';
const DBName = 'laboratorio';
const URI = `mongodb+srv://${userMongo}:${passwordMongo}@data.6ep5zsp.mongodb.net/${DBName}?retryWrites=true&w=majority`;

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