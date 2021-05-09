/* 
    Class: DIT/1B/03
    Admission Number: P2026453
    Name: Phan Kiah Fong Nicholas
*/

var jwt = require('jsonwebtoken');

var config = require('../config');

// -------------------------------------------------
// Objects / functions
// -------------------------------------------------
function verifyToken(req, res, next) {
    console.log(req.headers);
    //retrieve authorization header’s content
    // Authorization: Bearer <token>
    var token = req.headers['authorization'];
    // Bearer <token>
    console.log(token);

    //process the token
    if (!token || !token.includes('Bearer')) {

        res.status(403);
        return res.send({
            auth: 'false',
            message: 'Not authorized!'
        });
    }
    else {
        //obtain the token’s value
        token = token.split('Bearer ')[1];
        /*
            token.split('Bearer ')
            "Bearer <token>".split('Bearer ')
             |------||----|
                |       |---------------|
                |------------------|    |
            you get back an array: |    |
            (                      |    |
                "Bearer ",---------|    |  [0]
                "<token>"---------------|  [1]
            )       
        */

        // <token>
        console.log(token);
        
        jwt.verify(token, config.key, function (err, decoded) {
            // verify token
            if (err) {
                var errorMessage={
                    auth: false,//<-------------------------|
                    message: 'Not authorized!!!!!!!!!!'   //|
                }                                         //|
                //               |--------------------------|
                // when auth's false is not a string , it creates an error:
                // The "chunk" argument must be one of type string of Buffer.
                // Received type object
                // Thus, we need to stringify it, before sending it out

                res.status(403);
                return res.type('json').status(403).end(JSON.stringify(errorMessage));
            } else {
                //decode the userid and store in req for use
                req.userid = decoded.userid;
                //decode the role and store in req for use
                req.role = decoded.role;
                next();
            }

        });
    }

}

// exports
module.exports = verifyToken;
