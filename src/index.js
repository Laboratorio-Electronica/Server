const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const users = require('../data/users.json')

const privateKey = 'KrlozMedina'
const port = process.env.PORT || 1234;

// Mongo DB
    const mongoose = require('mongoose');

    const userMongo = 'KrlozMedina';
    const passwordMongo = 'PNj99mXR1ryVDBgz';
    const DBName = 'laboratorio';
    const uri = `mongodb+srv://${userMongo}:${passwordMongo}@data.6ep5zsp.mongodb.net/${DBName}?retryWrites=true&w=majority`;

    // mongoose.set('strictQuery', true);


    // mongoose.connect(uri)
    //     .then(() => console.log('Base de datos conectada'))
    //     .catch(e => console.error('error', e))

    const user = require('../models/user')

    // const technical = new user({ username: 'technical2', password: "technical2022", name: "Técnico nuevo" });
    // technical.save().then(() => console.log('yo reparo'));


    try {
        const arrayUsers = user.find()
            .then(res => console.log(res))
    } catch (error) {
        console.log(error)
    }

var name;

function findUser(username, password) {
    var status;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            status = true;
            name = users[i].name
            break;
        } else {
            status = false;
        }
    }
    return status;
}

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/login', (req, res) => {
    const user = req.body.user;
    
    if (findUser(user.username, user.password)) {
        const token = jwt.sign(user, privateKey, { expiresIn: '1h' });                
        res.status(200).json({ token, name });
        // console.log(token)
    } else {
        res.status(200).json({ token: 'noToken'})
    }
});

app.post('/test', (req, res) => {
    const token = req.headers['authorization'];
    // console.log(token)
    jwt.verify(token, privateKey, (err, user) => {
        if (err) {
            // console.log('Unauthorized')
            res.status(403)
                .json({ msg: 'Unauthorized' })
        } else {
            res.status(200).json({ msg: 'Congratulations', name})
        }
    })
})

app.listen(port, () => {
    console.log(`Server ready on ${port}`)
})