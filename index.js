const async = require('async')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const url = [
    {
        name: 'taara',
        url: 'http://rov.wikia.com/wiki/Taara'
    },
    {
        name: 'zuka',
        url: 'http://rov.wikia.com/wiki/Zuka'
    },
    {
        name: 'murad',
        url: 'http://rov.wikia.com/wiki/Murad'
    }
]


const queue = async.queue((task, callback) => {
    request(task.url, (error, response, body) => {
        $ = cheerio.load(body)
        const text = $('#mw-content-text p').text()
        fs.writeFile(task.name + ".txt", text, (err) => {
            if(err){
                console.log(err)
                callback()
            }
            console.log("save complete")
            callback()
        })
    })
},1)

queue.drain = () => {
    console.log("all process complete")
}

queue.push(url)