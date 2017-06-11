const fb = require('./lib/facebook.js')
const msg = require('./lib/messages.js')
const utils = require('./lib/utils.js')

const main = async () => {
    try {
        let today = await utils.getDate()
        console.log('Get date successful')

        let api = await fb.signIn()
        console.log('Login facebook successful')

        let friends = await fb.getFriends(api)
        console.log('Get friend list successful')

        let { msg: bibleStudy } = await msg.getBibleStudy(today)
        console.log('Get bible schedule successful')

        let weather = await msg.getWeather()
        console.log('Get weather successful')

        let message = `【讀經進度】\n${bibleStudy}\n\n【天氣小幫手(測試中)】\n${weather}`

        await fb.sendMessageToFriends(api, message, friends)
        console.log('Message send successful')
    } catch (error) {
        console.error(error)
    }
}

main()
