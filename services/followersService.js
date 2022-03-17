const configLibs = require('../libs/configLibs')
const githubLibs = require('../libs/githubLibs')
const dataLib = require('../libs/dataLib')
const costants = require('../config/costants')

const followersService = {
    checkUnfollows: async () => {
        console.log("checking unfollowers")
        let config
        try{
            config = await configLibs.getConfig()
            if(config == null || config.user == null){
                throw {error: costants.error.user} 
            }
        } catch(e){
            throw {error: costants.error.user}
        }

        try{
            const followers = await githubLibs.getFollowers(config.user)
            //console.log(followers)
        
            const data = await dataLib.getData()
            if(data == null){
                //data file does not exists or has a problem
                throw {error: costants.error.dataFile}
            }

            let unfollowers = []
            for(const follower of followers){
                if(data[follower] == null){
                    unfollowers.push(data[follower])
                }
            }

            if(unfollowers.length == 0){
                console.log("No one has unfollewd you since last check")
                return
            }

            console.log("Users tha unfollows you:")
            for(const unfollower of unfollowers){
                console.log(`${unfollower.login} - ${unfollower.html_url}`)
            }

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = followersService