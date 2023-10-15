const express = require('express')
const router = express.Router()
const PORT = 8000
const app = express()
const newsAggregatorRoutes = require('./controllers/newsAggregatorController')
const { signup, signin } = require('./controllers/authController')
const verifyToken = require('./middlewares/authJWT')
const Validator = require('./helpers/validator')
const path = require('path');
const fs = require('fs')
const userData = require('./Users.json')

app.use(router)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.status(200).send("Welcome to News Aggregator app")
})
app.post("/register", signup)
app.post("/login", signin)
app.get("/preferences", verifyToken, (req, res) => {
    if (req.user) {
        const {category, language, country} = req.user
        res.status(200).json({
            "preferences": {
                "category": category,
                "language": language,
                "country": country
            }
        })
    } else {
        return res.status(403).send({
            message: req.message
        });
    }
})
app.put("/preferences", verifyToken, (req, res) => {
    if (req.user) {
        const user = req.user
        const userProvidedDetails = req.body
        const updatedAt = Date.now()
        const writePath = path.join(__dirname, '.', 'Users.json');
        user.updatedAt = updatedAt
        user.category = userProvidedDetails.category !== undefined && Validator.validateCategory(userProvidedDetails.category) ? userProvidedDetails.category : user.category
        user.language = userProvidedDetails.language !== undefined && Validator.validatelanguage(userProvidedDetails.language) ? userProvidedDetails.language : user.language
        user.country = userProvidedDetails.country !== undefined && Validator.validateCountry(userProvidedDetails.country) ? userProvidedDetails.country : user.country
        const userDataModified = JSON.parse(JSON.stringify(userData));
        // userDataModified.users.push(userProvidedDetails);
        fs.writeFile(writePath, JSON.stringify(userDataModified), err => {
            if(err) {
                return res.status(500).send("Something went wrong while updating the user preferences");
            } else {
                return res.status(201).send("User preferences updated successfully");
            }
        });
    } else {
        return res.status(403).send({
            message: req.message
        });
    }
})
router.use('/news', verifyToken, newsAggregatorRoutes)



app.listen(PORT, (err) => {
    if(err) {
        console.log('Internal server error')
    } else {
        console.log(`Server is running on port: ${PORT}`)
    }
})