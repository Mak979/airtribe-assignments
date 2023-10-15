const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config()
const userData = require('../Users.json');

const verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.API_SECRET, function(err, decode) {
            if(err) {
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            } else {
                const userExist = userData.users.filter(user => user.id == decode.id)
                if (userExist) {
                    req.user = userExist[0]
                    req.message = "Found the user successfully";
                    next();
                } else {
                    req.user = undefined;
                    req.message = "Some error while finding the user";
                    next();
                }
            }
        });
    } else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
};

module.exports = verifyToken;