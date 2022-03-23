const args = process.argv.slice(2);

const configLibs = require('../libs/configLibs')
const followersService = require('./followersService')

const handleSetUsername = async () => {
    try{
        if(args.length > 1){
            const username = args[1]
            const cf = {
                user: username
            }

            await configLibs.setConfig(JSON.stringify(cf))

            await followersService.initDataFile(username)

        } else {
            const config = await configLibs.getConfig()

            if(config == null || config.user == null){
                console.log("User not configured")
                return
            }
            console.log(`Configured user is ${config.user}`)
        }
    } catch(e){
        console.log("Error initializing user")
    }
}

const funMap = {
    "-i": handleSetUsername,
    "-u": async ()=>{ 
        try{
            await followersService.checkUnfollows()
        } catch(e){
            console.log("Error has occured")
        }
    }
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