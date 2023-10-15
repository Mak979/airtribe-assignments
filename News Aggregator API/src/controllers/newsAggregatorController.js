const express = require('express')
const newsAggregatorRoutes = express.Router()
const dotenv = require('dotenv').config()

const {getNews} = require('../helpers/newsAggregatorHelper')

newsAggregatorRoutes.use(express.json())

const apiKey = process.env.API_KEY
let baseUrl = `https://newsapi.org/v2`

newsAggregatorRoutes.get('/', async (req, res) => {
    if (req.user) {
        const {category, language, country} = req.user
        const url = `${baseUrl}/top-headlines?category=${category}&language=${language}&country=${country}&apiKey=${apiKey}`
        try {
            const resp = await getNews(url)
            return res.status(200).json(resp)
        } catch (err) {
            return res.status(500).send({Error: err})
        }
    } else {
        return res.status(403).send({
            message: req.message
        });
    }
})

newsAggregatorRoutes.get('/search/:keyword', async (req, res) => {
    if (req.user) {
        keyword = req.params.keyword
        const url = `${baseUrl}/everything?q=${keyword}&apiKey=${apiKey}`
        try {
            const resp = await getNews(url)
            return res.status(200).json(resp)
        } catch (err) {
            return res.status(500).send({Error: err})
        }
    } else {
        return res.status(403).send({
            message: req.message
        });
    }
    
})


module.exports = newsAggregatorRoutes
