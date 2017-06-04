const login = require("facebook-chat-api")
const fs = require("fs")
const config = require("./config")

function loginFacebook() {
    return new Promise((resolve, reject) => {
        try {
            let appstate_fs = fs.readFileSync("appstate.json", "utf8")
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

exports.loginFacebook = loginFacebook