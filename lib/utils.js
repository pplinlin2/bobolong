const moment = require('moment')
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
        let today = moment().format('YYYY-MM-DD')
        resolve(today)
    })
}

const zhTW2enUS = async (zhTW) => {
    return new Promise((resolve, reject) => {
        let enUS = {
            "創": "GEN", "出": "EXO", "利": "LEV", "民": "NUM", "申": "DEU",
            "書": "JOS", "士": "JDG", "得": "RUT", "撒上": "1SA", "撒下": "2SA",
            "王上": "1KI", "王下": "2KI", "代上": "1CH", "代下": "2CH", "拉": "EZR", "尼": "NEH", "斯": "EST",
            "伯": "JOB", "詩": "PSA", "箴": "PRO", "傳": "ECC", "歌": "SNG",
            "賽": "ISA", "耶": "JER", "哀": "LAM", "結": "EZK", "但": "DAN",
            "何": "HOS", "珥": "JOL", "摩": "AMO", "俄": "OBA",
            "拿": "JON", "彌": "MIC", "鴻": "NAM", "哈": "HAB",
            "番": "ZEP", "該": "HAG", "亞": "ZEC", "瑪": "MAL",
            "太": "MAT", "可": "MRK", "路": "LUK", "約": "JHN",
            "徒": "ACT", "羅": "ROM", "林前": "1CO", "林後": "2CO",
            "加": "GAL", "弗": "EPH", "腓": "PHP", "西": "COL",
            "帖前": "1TH", "帖後": "2TH", "提前": "1TI", "提後": "2TI",
            "多": "TIT", "門": "PHM", "來": "HEB", "雅": "JAS",
            "彼前": "1PE", "彼後": "2PE", "約壹": "1JN", "約貳": "2JN", "約參": "3JN",
            "猶": "JUD", "啟": "REV"
        }[zhTW]
        resolve(enUS)
    })
}

exports.UrlShortener = UrlShortener
exports.getDate = getDate
exports.zhTW2enUS = zhTW2enUS