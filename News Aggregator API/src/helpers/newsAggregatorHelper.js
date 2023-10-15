const {default: axios} = require('axios')


const getNews = (url) => {
    return new Promise((resolve, reject) => {

        axios.get(url).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err)
        })
    })
}

module.exports = {
    getNews
}