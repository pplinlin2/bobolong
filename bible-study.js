const fs = require('fs')
const marked = require('marked')
const cheerio = require("cheerio")
const config = require("./config")

function getBibleStudy(today) {
    let schedule_md = fs.readFileSync("schedule.md", 'utf8')
    let schedule_html = marked(schedule_md)
    $ = cheerio.load(schedule_html)

    const result = $("table tbody tr").map((i, elem) => {
        let [
            date, 
            start_book, 
            start_chapter, 
            end_book, 
            end_chapter
        ] = $(elem).text().trim().split('\n')
        if(date === today) {
            url = `http://cb.fhl.net/read.php?VERSION2=cunp89&TABFLAG=2&chineses=${start_book}&chap=${start_chapter}`
            msg = `今天的進度是：${start_book}${start_chapter} ~ ${end_book}${end_chapter}，連結在這裡：${url}`
            return {date, start_book, start_chapter, end_book, end_chapter, url, msg}
        }
    }).get()[0]
    return result
}

exports.getBibleStudy = getBibleStudy