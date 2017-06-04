const login = require("facebook-chat-api")
const fs = require("fs")
const bs = require("./bible-study")
const fb = require('./facebook-login')

function sendFacebookMessage(api, friends) {
    return new Promise((resolve, reject) => {
        let today = new Date().toISOString().substr(0, 10)

        let message = bs.getBibleStudy(today).msg

        console.log(friends)
        friends.map((friend) => {
            api.sendMessage(message, friend.userID)
            console.log(`Send message to ${friend.fullName}`)
        })

        resolve()
    })
}

function getFriends(api) {
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

let tools = {}
fb.loginFacebook()
.then((api) => {
    tools.api = api
    console.log('Login facebook successful')
    return getFriends(api)
})
.then((friends) => {
    tools.friends = friends
    console.log('Get friend list successful')
    return sendFacebookMessage(tools.api, friends)
})
.then(() => {
    console.log('Message send successful')
})
.catch((error) => {
    console.error(error)
})