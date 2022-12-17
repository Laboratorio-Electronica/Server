const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// const users = require('../data/users.json')
const {getUsers} =  require('./mongoDB')

const privateKey = 'KrlozMedina'
const port = process.env.PORT || 1234;


var name;

async function findUser(username, password, cb) {
    var status;
    const users = await cb;
    // console.log(users)
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

async function generateToken (res, user) {
    console.log('Holiiiii')
    if (await findUser(user.username, user.password, getUsers())) {
        const token = jwt.sign(user, privateKey, { expiresIn: '1h' });                
        res.status(200).json({ token, name });
    } else {
        res.status(200).json({ token: 'noToken'})
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
            res.status(200).json({ msg: 'Congratulations', name})
        }
    })
})

app.listen(port, () => {
    console.log(`Server ready on ${port}`)
})