const request = require('request')

const config = require("./config")

const UrlShortener = async (longUrl) => {
    return new Promise((resolve, reject) => {
        request.post(`https://www.googleapis.com/urlshortener/v1/url?key=${config.APIKEY}`, {
            json: {
                longUrl
            }
        }, function (error, response, body) {
            if(error) { reject(err) }
            let shortUrl = body.id
            resolve(shortUrl)
        })
    })
}

const getDate = async () => {
    return new Promise((resolve, reject) => {
        let today = new Date(new Date().valueOf() - new Date().getTimezoneOffset()*60000).toISOString().substr(0, 10)
        resolve(today)
    })
}

exports.UrlShortener = UrlShortener
exports.getDate = getDate