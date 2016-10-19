/**
 * Created by Administrator on 2016/8/8.
 */
var http = require('http')
var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxyServer({})
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {'Content-Type':'text/plain'})
    res.end('Something went wrong')
})

var server = http.createServer(function (req, res) {
    var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("client ip:" + ip + ", host:" + host);
    switch(host){
        case '115.159.38.41':
            proxy.web(req, res, { target: 'http://localhost:8124}'})
            break
        default: res.writeHead('200',{'Content-Type': 'text/plain'})
            res.end('welcome to my server')
    }
})

console.log('listen on port:80')
server.listen(80)