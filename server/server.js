const express = require('express')
const server = express()

const headers = (res, path) => {
    if(/\.wasm$/i.test(path)) {
        res.set('Content-Type', 'application/wasm')
    }
}

server.use('/', express.static('dist', {setHeaders: headers}))
server.listen(9000)
console.log('Server listening on port 9000')
