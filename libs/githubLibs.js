const appConfig = require('../config/applicationConfig')
const httpClient = require('./httpClient')

const githubLibs = {
    getFollowers: (user) => {
        return httpClient.get(`${appConfig.githubApiPath}/users/${user}/followers`,{})
    }
}

module.exports = githubLibs