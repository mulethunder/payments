var path = require('path');
var http = require('http');
var express = require('express');
var yaml = require('js-yaml');
var fs = require('fs');
var config = require('./config');

// Create an Express web app
var app = express();


// New Code
var mongo = require('mongodb');
var monk = require('monk');
var MONGODB_CREDENTIALS = "";

// if ((config.MONGODB_USERNAME != null && config.MONGODB_PASSWORD != null &&
//         config.MONGODB_USERNAME != undefined && config.MONGODB_PASSWORD != undefined) &&
//     config.MONGODB_USERNAME != "NA" && config.MONGODB_PASSWORD != "NA") {

//     MONGODB_CREDENTIALS = config.MONGODB_USERNAME + ":" + config.MONGODB_PASSWORD + "@";
//     console.log("Connecting to MongoDB with username [" + config.MONGODB_USERNAME + "]");
// }


// var db = monk(MONGODB_CREDENTIALS + config.MONGODB_SERVER + ':' + config.MONGODB_PORT + '/medrec');

// Converting YAML into JSON for Swagger UI loading purposes:
var inputfile = 'payments-oas.yaml',
    outputfile = 'payments-oas.json',
    swaggerFileDef = {};

// Storing YAML -> JSON Format for visibility purposes:
//fs.writeFileSync(outputfile, JSON.stringify(swaggerFileDef, null, 2));


// Make our db accessible to our router
app.use(function (req, res, next) {
    // req.db = db;
    next();
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-App-Key');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Include the html assets
app.get('/payments-apis/v1', function (req, res) {

    console.log("Requesting [" + "/payments-apis/v1" + "]");

    // Uploading clean Swagger Definition file.
    swaggerFileDef = yaml.load(fs.readFileSync(inputfile, {
        encoding: 'utf-8'
    }));

    // Issuing dynamic updates:
    var isAPIGWSecured = false;

    /**
     * 1. Updating the Host location
     */
    if (config.API_GW_ENABLED != null &&
        config.API_GW_ENABLED != undefined &&
        config.API_GW_ENABLED == "true") {

        console.log("API_GW_ENABLED");

        swaggerFileDef.host = config.API_GW_SERVER + config.API_GW_BASEURL;

        // API GAteway is enabled, thus we default to HTTPS as first option:
        isAPIGWSecured = true;

    } else {

        // Updating the Host file dynamically
        swaggerFileDef.host = "" + req.headers.host;
    }

    /**
     * 2. Updating the default Scheme to use (i.e. HTTP or HTTPS)
     */
    if (isAPIGWSecured) {

        console.log("Default HTTPS over HTTP");

        // Swap and default HTTPS as first option:
        swaggerFileDef.schemes = ['HTTPS', 'HTTP'];
    }

    // Returning swagger definition:
    res.send(swaggerFileDef);
});

//Include the html assets
app.get('/payments-apis/v1/anonymous', function (req, res) {


    console.log("Requesting [" + "/payments-apis/v1/anonymous" + "]");

    // Uploading clean Swagger Definition file.
    swaggerFileDef = yaml.load(fs.readFileSync(inputfile, {
        encoding: 'utf-8'
    }));


    // Issuing dynamic updates:
    var isAPIGWSecured = false;

    /**
     * 1. Updating the Host location to point to Anonymous API
     */
    if (config.API_GW_ENABLED != null &&
        config.API_GW_ENABLED != undefined &&
        config.API_GW_ENABLED == "true") {

        console.log("API_GW_ENABLED");

        swaggerFileDef.host = config.API_GW_SERVER + "/api/md/anonymous";

        // API GAteway is enabled, thus we default to HTTPS as first option:
        isAPIGWSecured = true;

    } else {

        // Updating the Host file dynamically
        swaggerFileDef.host = "" + req.headers.host;
    }

    /**
     * 2. Updating the default Scheme to use (i.e. HTTP or HTTPS)
     */
    if (isAPIGWSecured) {

        console.log("Default HTTPS over HTTP");

        // Swap and default HTTPS as first option:
        swaggerFileDef.schemes = ['HTTPS', 'HTTP'];
    }

    /**
     * 3. Updating some legends to ensure it reads as an anonymous MedRec access
     */
    if (isAPIGWSecured) {

        swaggerFileDef.info.title += " (Anonymous access)";
        swaggerFileDef.info.description += ". This is an anonymous Access and your data will " +
            "last only during this session. If you wish to obtain a long-running session, sign up at http://developers.oracleau.cloud";
    }

    /**
     * 4. Adding custom query-based X-App-Key for each path and set it to this session value:
     */
    if (isAPIGWSecured) {

        // 36 digits session id should suffice...
        var length = 36,
            charset = "abcdefABCDEF0123456789",
            sessionId = "ANONYM";
        for (var i = 0, n = charset.length; i < length; ++i) {
            sessionId += i % 8 == 0 ? '-' : charset.charAt(Math.floor(Math.random() * n));
        }


        // Custom header:
        var custHeader = {
            "name": "X-App-Key",
            "in": "header",
            "description": "Temporary API Key. Do not modify...",
            "readOnly": true,
            "required": false,
            "type": "string",
            "format": "string",
            "default": sessionId
        };


        // Iterating across all Paths:
        for (var apiKey in swaggerFileDef.paths) {

            //console.log("Found apiKey [" + apiKey + "]");

            // For each Path, iterate across all its Methods:
            for (var methodName in swaggerFileDef.paths[apiKey]) {

                //console.log("Found methodName [" + methodName + "]");

                var fullMethod = swaggerFileDef.paths[apiKey][methodName];

                if (fullMethod["parameters"] !== null && fullMethod["parameters"] !== undefined &&
                    fullMethod.parameters.length > 0) {

                    //console.log("Parametrs found for [" + apiKey + "][" + methodName + "] pushing instead...");

                    fullMethod.parameters.push(custHeader);

                } else {

                    fullMethod["parameters"] = [custHeader];
                }
            }
        }
    }

    // Returning swagger definition:
    res.send(swaggerFileDef);
});


app.use('/', express.static(path.join(__dirname, 'swagger-dist')));

app.use('/anonymous', express.static(path.join(__dirname, 'swagger-dist/anonymous.html')));


// Configure routes and middleware for the application
require('./router')(app);

// Create an HTTP server to run our application
var server = http.createServer(app);

// export the HTTP server as the public module interface
module.exports = server;