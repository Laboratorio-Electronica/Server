const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const privateKey = 'KrlozMedina'
const users = require('../data/users.json')

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

app.listen(1234, () => {
    console.log("Server ready on 1234")
})