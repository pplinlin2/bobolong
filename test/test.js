const should = require('chai').should()

const fb = require('../lib/facebook.js')
const msg = require('../lib/messages.js')
const utils = require('../lib/utils.js')

describe('Utilities', () => {
    it('URL shortener', async () => {
        let longUrl = 'http://github.com/pplinlin2'
        let url = await utils.UrlShortener(longUrl)
        url.should.have.string('goo.gl')
    })

    it('Get the date', async () => {
        let today = await utils.getDate()
        today.should.match(/\d{4}-\d{2}-\d{2}/)
    })
})

describe('Messages', () => {
    it('Bible study of 2017-06-12', async () => {
        let result = await msg.getBibleStudy('2017-06-12')
        let { 
            start_book, start_chapter, 
            end_book, end_chapter
        } = result
        start_book.should.equal('王下')
        start_chapter.should.equal('13')
        end_book.should.equal('王下')
        end_chapter.should.equal('14')
    })

    it('Bible study of 2017-06-14', async () => {
        let result = await msg.getBibleStudy('2017-06-14')
        let { msg: message } = result
        message.should.not.have.string('~')
    })

    it('Get weather', async () => {
        let result = await msg.getWeather()
        result[0].should.equal('今')
    })
})

describe('Facebook', function () {
    this.timeout(7000)
    let api

    before(async () => {
        api = await fb.signIn()
    })

    it('Sign in', () => {
        api.should.exist
    })

    it('Get friend list', async () => {
        let friends = await fb.getFriends(api)
        let friends_name = friends.map(friend => friend.fullName)
        friends_name.should.include('陳頡')
    })
})