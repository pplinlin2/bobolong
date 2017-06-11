const cheerio = require("cheerio")
const fs = require('fs')
const marked = require('marked')
const path = require('path')
const request = require('request')

const utils = require('./utils')

const getBibleStudy = async (today) => {
    return new Promise((resolve, reject) => {
        let schedule_md = fs.readFileSync(
            path.join(__dirname, "schedule.md"), 
            'utf8'
        )
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
                let url = await utils.UrlShortener(longUrl)

                let schedule_str
                if (start_book === end_book &&
                    start_chapter === end_chapter) {
                    schedule_str = `${start_book}${start_chapter}`
                } else {
                    schedule_str = `${start_book}${start_chapter} ~ ${end_book}${end_chapter}`
                }
                msg = `今天的進度是：${schedule_str}，連結在這裡：${url}`
                resolve({date, start_book, start_chapter, end_book, end_chapter, url, msg})
            }
        })
    })
}

const getWeather = async () => {
    return new Promise((resolve, reject) => {
        request('http://www.cwb.gov.tw/V7/forecast/taiwan/Data/W50_63.txt', (error, response, body) => {
            let regex = /^今/
            body.split("<BR>").map((elem) => {
                if (elem.match(regex)) {
                    resolve(elem)
                }
            })
        })
    })
}

exports.getBibleStudy = getBibleStudy
exports.getWeather = getWeather