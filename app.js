const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reglogin = require('./routes/regloginroutes');
const connection = require('./database/dbconnect');

const app = express();
const router = express.Router();

// if running server using ngrok
const ngrok = require('ngrok');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// cors middleware / enable cors
app.use(cors());


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


ngrok.connect({
    proto : 'http',
    addr : port,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});