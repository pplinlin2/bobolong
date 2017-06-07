const login = require("facebook-chat-api")
const fs = require("fs")
const bs = require("./bible-study")
const fb = require('./facebook-login')

async function sendFacebookMessage(api, friends) {
    return new Promise(async (resolve, reject) => {
        let today = new Date(new Date().valueOf() - new Date().getTimezoneOffset()*60000).toISOString().substr(0, 10)
        console.log('Today: ' + today)

        let result = await bs.getBibleStudy(today)
        let message = result.msg

        // console.log(friends)
        // console.log(message)
        friends.map((friend) => {
            api.sendMessage(message, friend.userID)
            console.log(`Send message to ${friend.fullName}`)
        })

        resolve()
    })
}

async function getFriends(api) {
    return new Promise((resolve, reject) => {
        api.getFriendsList((err, data) => {
            if(err) { reject(err) }
            let friends = data.map((elem) => ({
                fullName: elem.fullName, 
                userID: elem.userID
            }))
            resolve(friends)
        })
    })
}

const main = async () => {
    try {
        let api = await fb.loginFacebook()
        console.log('Login facebook successful')

        let friends = await getFriends(api)
        console.log('Get friend list successful')

        await sendFacebookMessage(api, friends)
        console.log('Message send successful')
    } catch (error) {
        console.error(error)
    }
}

main()