/* 
    Class: DIT/1B/03
    Admission Number: P2026453
    Name: Phan Kiah Fong Nicholas
*/


const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

var check = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        res.status(401).send("Unauthorized!");
        return;
    }
    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET.key, { algorithms: ["HS256"] }, (error, decodedToken) => {
        if (error) {
            console.log(error);
            res.status(401).send("Unauthorised!!!!");
            return;
        }
        console.log("---------------------[Decoded Token]----------------------")
        console.log(decodedToken);
        req.decodedToken = decodedToken;
        next();
    });
};
module.exports = check;
