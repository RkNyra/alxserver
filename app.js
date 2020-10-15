const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reglogin = require('./routes/regloginroutes');
const jokesnkitsu = require('./routes/thirdpartyapis');

const app = express();
const router = express.Router();

// used when running server locally using ngrok
// const ngrok = require('ngrok');

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

// 3rd party APIs
router.get('/getJokesData', jokesnkitsu.getJokesData);
router.get('/getKitsuData', jokesnkitsu.getKitsuData);

//to include /api in my endpoints 
app.use('/api', router);


app.get('/', (req, res) => {
    res.send('ALX-Launchpad-Server is running fine...')
});

// server port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`ALX Launchpad Server listening on port ${port}...`));


// used when running server locally using ngrok
// ngrok.connect({
//     proto : 'http',
//     addr : port,
// }, (err, url) => {
//     if (err) {
//         console.error('Error while connecting Ngrok',err);
//         return new Error('Ngrok Failed');
//     }
// });