const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {getUsers, createUser} =  require('./mongoDB')

const privateKey = process.env.PRIVATE_KEY;
const port = process.env.PORT || 1234;
var name;
var role;

async function findUser(username, password, cb) {
    var status;
    const users = await cb;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            status = true;
            name = users[i].name
            role = users[i].role
            break;
        } else {
            status = false;
        }
    }
    return status;
}

async function generateToken (res, user) {
    console.log(user.username, user.password)
    if (await findUser(user.username, user.password, getUsers())) {
        const token = jwt.sign(user, privateKey, { expiresIn: '1h' });                
        res.status(200).json({ token, name, role });
    } else {
        res.status(403).json({ token: 'noToken'})
    }
}

async function compareUsers(username, cb) {
    const users = await cb;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
}

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/login', (req, res) => {
    const user = req.body.user;
    generateToken(res, user);
});


app.post('/test', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, privateKey, (err, user) => {
        if (err) {
            res.status(403)
                .json({ msg: 'Unauthorized' })
        } else {
            compareUsers(user.username, getUsers()).then(userDB => {
                res.status(200).json({ status: 200, msg: 'Congratulations', role: userDB.role})
            })
        }
    })
})

// const User = require('../models/user')

app.post('/signin', async (req, res) => {
    await getUsers().then(users => {
        // console.log('req',req.body.username)
        if (!users.some(user => user.username === req.body.username)) {
            console.log('se puede crear el usuario')
            createUser(req.body).then(_ => res.status(200).json({msg: 'Correct'}))
        } else {
            console.log('el usuario ya existe')
            res.status(200).json({ msg: 'User already exists'})
        }
    })
})

app.listen(port, () => {
    console.log(`Server ready on ${port}`)
})