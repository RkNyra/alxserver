const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const reglogin = require('./routes/regloginroutes');
const connection = require('./database/dbconnect');

const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// testing route
router.get('/router', function(req, res) {
    res.json({message: 'Welcome to alx api module'});
});

// user-reg route
router.post('/register', reglogin.register);
router.post('/login', reglogin.login);
app.use('/api', router);


app.get('/', (req, res) => {
    res.send('ALX-Launchpad-Server is running fine...')
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`ALX Launchpad Server listening on port ${port}...`));