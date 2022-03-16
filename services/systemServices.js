const args = process.argv.slice(2);

const configLibs = require('../libs/configLibs')
const followersService = require('./followersService')

const getSetUsername = async () => {
    
    if(args.length > 1){
        const username = args[1]
        const cf = {
            user: username
        }

        await configLibs.setConfig(JSON.stringify(cf))

    } else {
        const config = await configLibs.getConfig()

        if(config == null || config.user == null){
            console.log("User not configured")
            return
        }
        console.log(`Configured user is ${config.user}`)
    }
}

const funMap = {
    "-i": getSetUsername,
    "-u": followersService.checkUnfollows
}

const SystemServices = {
    execute: () => {       
        
        if(args.length >= 1){
            const fun = funMap[args[0]]
            if(fun != null){
                fun()
            } else {
                console.log("Param not recognized")
            }
        } else {
            console.log("Params Error")
        }
        
    }
}

module.exports = SystemServices