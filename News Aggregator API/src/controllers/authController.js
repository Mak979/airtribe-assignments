const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userData = require('../Users.json')
const { randomUUID } = require('crypto')
const path = require('path');
const fs = require('fs')
const Validator = require("../helpers/validator");
const dotenv = require('dotenv').config()

const signup = (req, res) => {
    const userProvidedDetails = req.body
    const writePath = path.join(__dirname, '..', 'users.json');
    const createdAt = Date.now()
    userProvidedDetails["password"] = bcrypt.hashSync(req.body.password, 8)
    userProvidedDetails["id"] = randomUUID()
    userProvidedDetails["createdAt"] =  createdAt
    userProvidedDetails["updatedAt"] =  createdAt
    const emailExist = userData.users.filter(user => user.email == userProvidedDetails.email)
    if (emailExist.length > 0) {
        res.status(404).json({"message": "Email already exists. Kindly provide a new email"})
    } else {
        if(Validator.validateUserInfo(userProvidedDetails).status == true) {
            const userDataModified = JSON.parse(JSON.stringify(userData));
            userDataModified.users.push(userProvidedDetails);
            fs.writeFile(writePath, JSON.stringify(userDataModified), err => {
                if(err) {
                    return res.status(500).send("Something went wrong while registering the user");
                } else {
                    return res.status(201).send(Validator.validateUserInfo(userProvidedDetails).message);
                }
            });
        }
    }
};

const signin = (req, res) => {
    const emailPassed = req.body.email;
    const passwordPassed = req.body.password;
    const emailExist = userData.users.filter(user => user.email == emailPassed)
    const user = emailExist[0]
        if(!user) {
            return res.status(404).send({message: "User not found"});
        }
        const passwordIsValid = bcrypt.compareSync(
            passwordPassed,
            user.password
        );
        if(!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }
        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });
        return res.status(200).send({
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
            },
            message: "Login Successful",
            accessToken: token
        });
    };
module.exports = {signin, signup};