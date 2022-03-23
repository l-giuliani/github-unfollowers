const fs = require('fs')
const utils = require('../utils/utils')

const configLibs = {
    getConfig: async () => {

        let config = null
        try{            
            cf = await utils.readFile('./settings/settings.json')
            config = JSON.parse(cf)
        } catch(e){
        }

        return config
    },
    setConfig: (data) => {

        if (!fs.existsSync('./settings')) {
            fs.mkdirSync('./settings');
        }

        return utils.writeFile('./settings/settings.json', data)
    }
}

module.exports = configLibs