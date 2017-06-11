const login = require("facebook-chat-api")
const fs = require("fs")
const path = require("path")

const config = require("./config")

const signIn = async () => {
    return new Promise((resolve, reject) => {
        try {
            let appstate_fs = fs.readFileSync(
                path.join(__dirname, "appstate.json"), 
                "utf8"
            )
            let appstate_js = JSON.parse(appstate_fs)
            login({appState: appstate_js}, (err, api) => {
                if(err) { reject(err) }
                resolve(api)
            })
        } catch (err) {
            login({
                email: config.ACCT, 
                password: config.PASS
            }, (err, api) => {
                if (err) { reject(err) }
                fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()))
                resolve(api)
            })
        }
    })
}

const getFriends = async (api) => {
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

const sendMessageToFriends = async (api, message, friends) => {
    return new Promise(async (resolve, reject) => {
        friends.map((friend) => {
            api.sendMessage(message, friend.userID)
            console.log(`Send message to ${friend.fullName}`)
        })

        resolve()
    })
}

exports.signIn = signIn
exports.getFriends = getFriends
exports.sendMessageToFriends = sendMessageToFriends