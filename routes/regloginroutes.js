const connection = require('../database/dbconnect');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




exports.register = async function(req, res) {

    const saltRounds = 10;
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    registereduserdata = `select * from ${process.env.DB_DATABASE}.alxusers where email = '${req.body.email}'`;
    connection.query(registereduserdata, function(err, result) {

        if(err){
            console.log(err);
            res.send({
                "code":400,
                "failed":"error occured",
                err
            });

        } else {
            if(req.body.username == undefined) {
                // if username-field is blank, alert that username field cannot be blank
                res.send({
                    "code": 400,
                    "failed": "Username field is required"
                })

            } else if(req.body.email == undefined) {
                // if email-field is blank, alert that email field cannot be blank
                res.send({
                    "code": 400,
                    "failed": "Email field is required"
                })

            } else if(req.body.password == undefined) {
                // if password-field is blank, alert that password field cannot be blank
                res.send({
                    "code": 400,
                    "failed": "Password field is required"
                })

            } else {

                if(result.length==0){
                    // all fields have been filled AND Email does not yet exist. Therfore save new user-data to ALX-DB.alxusers-table
                    // const password = req.body.password;
                    // const saltRounds = 10;
                    // const encryptedPassword = await bcrypt.hash(password, saltRounds);                   

                    let uniqueid = uuidv4()
                    let uniqueuserid = 'alx_' + uniqueid 
                    
                    let user={
                        "user_id": uniqueuserid,
                        "username": req.body.username,
                        "email": req.body.email,
                        "password": encryptedPassword     
                    }
        
                    connection.query('INSERT INTO alxusers SET ?', user, function(error, results){
                        if(error){
                            console.log('Error during registration', error);
                            res.send({
                                    "code": 400,
                                    "failed": "error occurred",
                                    error
                                })
                        } else {
                            res.send({
                                "code": 200,
                                "success":"ALX user registered successfully"
                            });
                        }
                    });

                          
                
                } else {
                    // If email exists, alert user
                    res.send({
                        "code": 400,
                        "failed": "Email exists"
                    })
                }

            }
        }
    });
}



exports.login = async function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    
    connection.query('SELECT * FROM alxusers WHERE email = ?',[email], async function(error, results){
        if(error){
            res.send({
                "code":400,
                "failed":"error occured",
                error
            })
        } else {
            if(results.length > 0){
                const comparison = await bcrypt.compare(password, results[0].password)
                if(comparison){
                    let username = req.body.email;
                    let user = { name: username}
                    const accessToken = jwt.sign(user, process.env.JWT_TOKEN_KEY)

                    res.setHeader('Content-Type', 'application/json');
                    res.send({
                        "code":200,
                        "success":"login successful",
                        "accessjwtToken": accessToken,
                        results             
                    })
                }
                else {
                    res.send({
                        "code":204,
                        "error":"Email and password do not match",
                    })
                }
            }
        }
    });
}