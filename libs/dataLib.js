const fs = require('fs')
const utils = require('../utils/utils')

const dataLib = {
    getData: async () => {
        let cf = null
        try{            
            cf = await utils.readFile('./data/followers.json')
            return JSON.parse(cf)
        } catch(e){
            //console.log(e)
        }
        return cf
    },
    writeData: (data) => {

        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data');
        }

        return utils.writeFile('./data/followers.json', data)
    }
}

module.exports = dataLib