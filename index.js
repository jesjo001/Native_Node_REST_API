/*
* Primary file for the API
*
*/


//Dependencies
var http = require('http')
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//server should response to all req with a string
var server = http.createServer(function (req, res) {
    //Get the url and parse it into
    var parsedUrl = url.parse(req.url, true);

    //Get the path and
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the query string as an object
    var queryStringObject = parsedUrl.query;

    //Get the Http Method and
    var method = req.method.toLowerCase()

    //Get the headers 
    var headers = req.headers

    //Get the payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);

    });
    req.on('end', function () {
        buffer += decoder.end();

        res.end('Hello World\n');

        // log the request
        console.log(`Request received with payload`, buffer)
    })
    //Send the response
})

//start the server and listen to port 8084
server.listen(8084, function () {
    console.log(`The server is listening on port 8084`)
})