const cheerio = require("cheerio")
const fs = require('fs')
const marked = require('marked')
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

const getBibleStudy = async (today) => {
    return new Promise((resolve, reject) => {
        let schedule_md = fs.readFileSync("schedule.md", 'utf8')
        let schedule_html = marked(schedule_md)
        $ = cheerio.load(schedule_html)

        const result = $("table tbody tr").map(async (i, elem) => {
            let [
                date, 
                start_book, 
                start_chapter, 
                end_book, 
                end_chapter
            ] = $(elem).text().trim().split('\n')
            if(date === today) {
                longUrl = `http://cb.fhl.net/read.php?VERSION2=cunp89&TABFLAG=2&chineses=${start_book}&chap=${start_chapter}`
                let url = await UrlShortener(longUrl)
                msg = `今天的進度是：${start_book}${start_chapter} ~ ${end_book}${end_chapter}，連結在這裡：${url}`
                resolve({date, start_book, start_chapter, end_book, end_chapter, url, msg})
            }
        }).get()[0]
    })
}

exports.getBibleStudy = getBibleStudy