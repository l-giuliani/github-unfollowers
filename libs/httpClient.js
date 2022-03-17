const axios = require('axios')
//import got from 'got'

const httpClient = {
    get: (url, headers, params) => {
        return axios({
            method: 'get',
            url: url,
            headers: headers
          })
    },
    post: (url, headers, body) => {
        return axios({
                method: 'post',
                url: url,
                headers: headers,
                data: body
            })
    }
}

module.exports = httpClient