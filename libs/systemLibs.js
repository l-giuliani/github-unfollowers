const readline = require('readline')

const SystemLibs = {
    consoleInput: (text) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise((resolve, reject)=>{
            rl.question('Do you want to update the follower list ? (y/n)', (inp) => {
                rl.close();
                resolve(inp)
            });
        })
        
    }
}

module.exports = SystemLibs