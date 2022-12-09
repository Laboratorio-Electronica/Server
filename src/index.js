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
    const dbname = 'laboratorio';
    const uri = `mongodb+srv://${userMongo}:${passwordMongo}@data.6ep5zsp.mongodb.net/${dbname}?retryWrites=true&w=majority`;

    mongoose.connect(uri)
        .then(() => console.log('Base de datos conectada'))
        .catch(e => console.error(e))

    const user = require('../models/user')

    // const tecnico = new user({ username: 'Tecnico2', password: "tecnico2022", name: "Tecnico nuevo" });
    // tecnico.save().then(() => console.log('yo reparo'));

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
    console.log(user)
    
    if (findUser(user.username, user.password)) {
        const token = jwt.sign(user, privateKey, { expiresIn: '1h' });                
        res.status(200).json({ token });
    } else {
        res.status(200).json({ token: 'noToken' })
    }
});

app.post('/test', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, privateKey, (err, user) => {
        if (err) {
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