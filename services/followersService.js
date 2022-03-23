

const configLibs = require('../libs/configLibs')
const githubLibs = require('../libs/githubLibs')
const dataLib = require('../libs/dataLib')
const systemLibs = require('../libs/systemLibs')
const costants = require('../config/costants')

const initDataFile = async (user) => {
    try{
        const followers = (await githubLibs.getFollowers(user)).data

        let fw = {}

        for(const follower of followers){
            fw[follower.login] = {
                html_url: follower.html_url
            }
        }

        await dataLib.writeData(JSON.stringify(fw))

    } catch(e){
        //console.log(e)
        throw e
    }
}

const followersService = {
    initDataFile: initDataFile,

    checkUnfollows: async () => {
        let config
        try{
            config = await configLibs.getConfig()
            if(config == null || config.user == null){
                console.log("User not configured - please init user with -i param")
                throw {error: costants.error.user} 
            }
        } catch(e){
            console.log("User not configured - please init user with -i param")
            throw {error: costants.error.user}
        }

        try{
            const followers = (await githubLibs.getFollowers(config.user)).data
        
            const data = await dataLib.getData()
            if(data == null){
                //data file does not exists or has a problem
                console.log("User not configured - please init user with -i param")
                throw {error: costants.error.dataFile}
            }

            let unfollowers = []
            for(const oldFollower in data){
                let found = false
                for(const follower of followers){
                    if(follower.login == oldFollower){
                        found = true
                        break;
                    }
                }
                if(!found){
                    unfollowers.push({
                        login: oldFollower,
                        html_url: data[oldFollower].html_url
                    })
                }
            }

            if(unfollowers.length == 0){
                console.log("No one has unfollowed you since last check")
                return
            }

            console.log("Users that unfollows you:")
            for(const unfollower of unfollowers){
                console.log(`${unfollower.login} - ${unfollower.html_url}`)
            }

            const input =  await systemLibs.consoleInput('Do you want to update the followers list ? (y/n)')
            if(input == 'y'){
                try{
                    await initDataFile(config.user)
                    console.log("Followers list updated")
                } catch(e) {
                    console.log("Unable to update followers list")
                }
            } 

        } catch (e) {
            //console.log(e)
            throw e
        }
    }
}

module.exports = followersService