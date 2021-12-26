/*
* Primary file for the API
*
*/


//Dependencies
var http = require('http')
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');


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

        //choose router handler
        var chosenHandler = typeof (router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound

        //construct data object to send to the handlers
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        //route the req to the handler specified in the router
        chosenHandler(data, function (statusCode, payload) {
            //usethe statuse code 
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            payload = typeof (payload) == 'object' ? payload : {};

            //convert the payload to a string
            var payloadString = JSON.stringify(payload);

            //Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("Returned this response", statusCode, payloadString);
        })
    })
    //Send the response
})

//start the server and listen to port 8084
server.listen(config.port, function () {
    console.log(`The server is listening on port ${config.port} in ${config.envName}`)
})

//Define our handlers
var handlers = {}

//Define the handlers 
handlers.sample = function (data, callback) {

    callback(406, { 'name': 'sample handler' })
}


//Not found handler
handlers.notFound = function (data, callback) {

}
//Define router 
var router = {
    'sample': handlers.sample
}
