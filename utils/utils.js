const fs = require('fs')

const utils = {
    readFile: (filename) => {        
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf8' , (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    },
    writeFile: (filename, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, data, err => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }
}

module.exports = utils