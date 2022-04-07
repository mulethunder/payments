var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var config = require("../../config");

//CRI change:
var bodyParser = require('body-parser');

// Configure application routes
module.exports = function (app) {

    // CRI change to allow JSON parsing from requests:    
    app.use(bodyParser.json()); // Support for json encoded bodies 
    app.use(bodyParser.urlencoded({ extended: true })); // Support for encoded bodies

    function log(apiMethod, apiUri, msg) {
        console.log("[" + apiMethod + "], [" + apiUri + "], [" + msg + "], [UTC:" +
            new Date().toISOString().replace(/\..+/, '') + "]");
    }

    /**
     * Adding MongoDB APIs:
     * 
     */

    /* GET ping. */
    app.get('/ping', function (req, res) {

        log("GET", "/ping", "Init");

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "XXX";

        log("GET", "/ping", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");


        var mockRes = {
            "status": "OK",
            "apiName": "accelerator-salesforce-sys-api",
            "apiVersion": "1.3.0",
            "timestamp": "2020-08-01T13:15:25.000Z",
            "dependencies": [
                {
                    "name": "Salesforce",
                    "status": "UP"
                }
            ]
        };

        res.send(mockRes);

    });

    /* POST payments. */
    app.post('/payments', function (req, res) {

        log("POST", "/payments", "Init");

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "XXX";

        var payments = req.body;

        if (payments == null || payments == undefined) {
            log("POST", "/physicians", "payments payload detected but no payments on it... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        log("POST", "/payments", "Payments entry to be inserted is [" + JSON.stringify(payments) + "]");


        var mockRes = {
            "responseStatus": "SUCCESS"
        };

        res.status(201).json(mockRes);

    });

    /* GET Payments. */
    app.get('/payments', function (req, res) {

        log("GET", "/payments", "Init");

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "XXX";

        log("GET", "/payments", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");


        var mockRes = [
            {
                "paymentStatus": "laborum",
                "paymentEffectiveDate": "1965-01-03",
                "id": "ipsum veniam est",
                "paymentType": "aliquip laborum fugiat",
                "authorizationProcessingMode": "cillum ex Excepteur enim",
                "paymentNumber": "cillum enim velit voluptate amet",
                "paymentAmount": -6362755,
                "macAddress": "dolore qui magna quis",
                "paymentGateway": [
                    {
                        "id": null,
                        "name": "fugiat dolore sit",
                        "paymentGatewayStatus": "ex",
                        "paymentGatewayCommentText": "tempor nostrud eiusmod irure in",
                        "auditInfo": {
                            "isDeleted": false,
                            "createdBy": "id",
                            "updatedBy": "ad Lorem incididunt",
                            "updatedDate": null,
                            "createdDate": null
                        },
                        "systemCredential": "quis in Lorem",
                        "paymentGatewayProvider": [
                            "adipisicing officia et"
                        ]
                    }
                ],
                "latestGatewayInternalResult": "consectetur cillum incididunt laboris",
                "netAppliedAmount": 64921198,
                "externalIds": [
                    {
                        "externalIdType": [
                            {
                                "id": "consequat sit incididunt ipsum tempor",
                                "name": "consequat magna laborum"
                            }
                        ],
                        "externalId": "dolor eiusmod ex",
                        "id": null,
                        "statusLastChangedDate": "1950-06-14T22:28:28.759Z",
                        "status": "INVALID"
                    }
                ],
                "balanceAmount": null,
                "paymentTreatment": [
                    "velit in"
                ],
                "paymentMethod": [
                    "Excepteur deserunt qui do"
                ],
                "commentText": "mollit",
                "latestGatewayResultCode": [
                    {
                        "id": null,
                        "name": "exercitation nisi dolore in commodo",
                        "description": "labore esse culpa cillum",
                        "auditInfo": {
                            "isDeleted": null,
                            "createdBy": "eu exercitation culpa sit amet",
                            "updatedBy": "est deserunt",
                            "updatedDate": "2001-05-21T01:38:58.718Z",
                            "createdDate": "1986-06-08T14:36:21.947Z"
                        }
                    }
                ],
                "iPAddress": "Duis ut Lorem qui",
                "paymentGroup": [
                    "magna nisi incididunt ad"
                ],
                "internalBusinessUnit": [
                    "dolor enim magna"
                ],
                "latestGatewayInternalReferenceNumber": "dolor amet reprehenderit",
                "latestGatewayDate": "2016-12-02",
                "name": "sint",
                "auditInfo": {
                    "isDeleted": null,
                    "createdBy": "mollit consequat cupidatat culpa nostrud",
                    "updatedBy": "ad ut tempor ipsum",
                    "updatedDate": null,
                    "createdDate": null
                },
                "salesOrderPaymentSummary": [
                    "Lorem ad ea"
                ],
                "latestGatewayReferenceNumber": "ut in",
                "externalCreatedDate": null,
                "totalAppliedAmount": -10785230,
                "customerPhoneNumber": "reprehenderit dolore",
                "paymentCancellationDate": "1977-07-30"
            }
        ];

        res.send(mockRes);

    });


    /* GET Payments/{id} */
    app.get('/payments/:id', function (req, res) {

        log("GET", "/payments/:id", "Init");

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "XXX";
        var id = req.params.id;

        if (id == null || id == undefined) {
            log("GET", "/payments/:id", "Payment Id empty or invalid... Nothing to do...");

            var mockRes = {
                "errorCode": "INVALID_PARAMETER",
                "errorMessage": {
                    "value": "The value you entered is out of bounds"
                },
                "transactionId": "dd960082-abbf-47c2-8c65-f18eeb35848b",
                "timeStamp": "2019-09-23T11:46:44.256-05:00",
                "additionalProp1": {}
            };

            res.status(400).end(mockRes);//Bad request...
            return;
        }

        log("GET", "/payments/" + id, "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");


        var mockRes = [
            {
                "paymentStatus": "laborum",
                "paymentEffectiveDate": "1965-01-03",
                "id": "ipsum veniam est",
                "paymentType": "aliquip laborum fugiat",
                "authorizationProcessingMode": "cillum ex Excepteur enim",
                "paymentNumber": "cillum enim velit voluptate amet",
                "paymentAmount": -6362755,
                "macAddress": "dolore qui magna quis",
                "paymentGateway": [
                    {
                        "id": null,
                        "name": "fugiat dolore sit",
                        "paymentGatewayStatus": "ex",
                        "paymentGatewayCommentText": "tempor nostrud eiusmod irure in",
                        "auditInfo": {
                            "isDeleted": false,
                            "createdBy": "id",
                            "updatedBy": "ad Lorem incididunt",
                            "updatedDate": null,
                            "createdDate": null
                        },
                        "systemCredential": "quis in Lorem",
                        "paymentGatewayProvider": [
                            "adipisicing officia et"
                        ]
                    }
                ],
                "latestGatewayInternalResult": "consectetur cillum incididunt laboris",
                "netAppliedAmount": 64921198,
                "externalIds": [
                    {
                        "externalIdType": [
                            {
                                "id": "consequat sit incididunt ipsum tempor",
                                "name": "consequat magna laborum"
                            }
                        ],
                        "externalId": "dolor eiusmod ex",
                        "id": null,
                        "statusLastChangedDate": "1950-06-14T22:28:28.759Z",
                        "status": "INVALID"
                    }
                ],
                "balanceAmount": null,
                "paymentTreatment": [
                    "velit in"
                ],
                "paymentMethod": [
                    "Excepteur deserunt qui do"
                ],
                "commentText": "mollit",
                "latestGatewayResultCode": [
                    {
                        "id": null,
                        "name": "exercitation nisi dolore in commodo",
                        "description": "labore esse culpa cillum",
                        "auditInfo": {
                            "isDeleted": null,
                            "createdBy": "eu exercitation culpa sit amet",
                            "updatedBy": "est deserunt",
                            "updatedDate": "2001-05-21T01:38:58.718Z",
                            "createdDate": "1986-06-08T14:36:21.947Z"
                        }
                    }
                ],
                "iPAddress": "Duis ut Lorem qui",
                "paymentGroup": [
                    "magna nisi incididunt ad"
                ],
                "internalBusinessUnit": [
                    "dolor enim magna"
                ],
                "latestGatewayInternalReferenceNumber": "dolor amet reprehenderit",
                "latestGatewayDate": "2016-12-02",
                "name": "sint",
                "auditInfo": {
                    "isDeleted": null,
                    "createdBy": "mollit consequat cupidatat culpa nostrud",
                    "updatedBy": "ad ut tempor ipsum",
                    "updatedDate": null,
                    "createdDate": null
                },
                "salesOrderPaymentSummary": [
                    "Lorem ad ea"
                ],
                "latestGatewayReferenceNumber": "ut in",
                "externalCreatedDate": null,
                "totalAppliedAmount": -10785230,
                "customerPhoneNumber": "reprehenderit dolore",
                "paymentCancellationDate": "1977-07-30"
            }
        ];

        res.send(mockRes);

    });


    
    /* PUT payments. */
    app.put('/payments/:id', function (req, res) {

        log("PUT", "/payments/:id", "Init");

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "XXX";

        var id = req.params.id;

        if (id == null || id == undefined) {
            log("PUT", "/payments/:id", "Payment Id empty or invalid... Nothing to do...");

            var mockRes = {
                "errorCode": "INVALID_PARAMETER",
                "errorMessage": {
                    "value": "The value you entered is out of bounds"
                },
                "transactionId": "dd960082-abbf-47c2-8c65-f18eeb35848b",
                "timeStamp": "2019-09-23T11:46:44.256-05:00",
                "additionalProp1": {}
            };

            res.status(400).json(mockRes);//Bad request...
            return;
        }

        var payments = req.body;

        if (payments == null || payments == undefined) {
            log("PUT", "/payments/:id", "payments payload detected but no payments on it... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        log("POST", "/payments/:" + id, "Payments entry to be inserted is [" + JSON.stringify(payments) + "]");


        var mockRes = {
            "responseStatus": "SUCCESS"
          };

        res.status(200).json(mockRes);

    });

   /* DELETE payments. */
   app.delete('/payments/:id', function (req, res) {

    log("DELETE", "/payments/:id", "Init");

    var appKey = req.get("X-App-Key");
    var appKey = appKey != null && appKey != undefined ? appKey : "";
    console.log("X-App-Key used is [" + appKey + "]");

    var DB_COLLECTION_NAME = "" + appKey + "XXX";

    var id = req.params.id;

    if (id == null || id == undefined) {
        log("DELETE", "/payments/:id", "Payment Id empty or invalid... Nothing to do...");

        var mockRes = {
            "errorCode": "INVALID_PARAMETER",
            "errorMessage": {
                "value": "The value you entered is out of bounds"
            },
            "transactionId": "dd960082-abbf-47c2-8c65-f18eeb35848b",
            "timeStamp": "2019-09-23T11:46:44.256-05:00",
            "additionalProp1": {}
        };

        res.status(400).json(mockRes);//Bad request...
        return;
    }

    log("DELETE", "/payments/:" + id, "Payment Id to be deleted is [" + id + "]");


    var mockRes = {
        "responseStatus": "SUCCESS"
      };

    res.status(200).json(mockRes);

});






    /**
     * Operations, to be migrated to HLS demo...


    /* GET Physicians. */
    app.get('/physicians', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "physicians";
        var db = req.db;

        log("GET", "/physicians", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        collection.find({}, {}, function (e, docs) {

            log("GET", "/physicians", "Found:" + JSON.stringify({ "Physicians": docs }));
            res.send({ "Physicians": docs });

        });


    });

    /* POST Physicians */
    app.post('/physicians', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "physicians";
        // Set our internal DB variable
        var db = req.db;
        var physicians = req.body.Physicians;

        if (physicians == null || physicians == undefined) {
            log("POST", "/physicians", "physicians payload detected but no physicians on it... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        log("POST", "/physicians", "Array of physicians to be inserted is [" + JSON.stringify(physicians) + "]");

        // Set collection
        log("POST", "/physicians", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        // Insert row to MongoDB
        collection.insert(physicians, function (err, doc) {
            if (err) {
                log("POST", "/physicians", "Oops, something wrong just happened.");
                res.send({
                    Message: 'Oops, something wrong just happened.'
                });
            }
            else {
                // Return succes answer
                log("POST", "/physicians", "Records were added successfully...");
                res.send({
                    Physicians: doc
                });
            }
        });
    });

    /* GET Physician by Id */
    app.get('/physicians/:PhysicianId', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "physicians";
        var id = req.params.PhysicianId;

        if (id == null || id == undefined) {
            log("GET", "/physicians/:PhysicianId", "Id empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        var db = req.db;

        log("GET", "/physicians/:PhysicianId", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        collection.find({ "_id": id }, {}, function (e, docs) {

            log("GET", "/physicians/:PhysicianId", "Found: [" + JSON.stringify(docs) + "]");
            res.send(docs);

        });
    });

    /* PUT a Physician by Id */
    app.put('/physicians/:PhysicianId', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "physicians";
        var id = req.params.PhysicianId;

        if (id == null || id == undefined) {
            log("PUT", "/physicians/:PhysicianId", "Id empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        // Set our internal DB variable
        var db = req.db;
        var physician = req.body;

        if (physician == null || physician == undefined) {
            log("PUT", "/physicians/:PhysicianId", "Physician payload detected but no physician on it... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        log("PUT", "/physicians/:PhysicianId", "Physician to be inserted is [" + JSON.stringify(physician) + "]");

        // Set collection
        log("PUT", "/physicians/:PhysicianId", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        // Update row to MongoDB
        collection.update({ "_id": id }, physician, function (err, doc) {
            if (err) {
                log("PUT", "/physicians/:PhysicianId", "Oops, something wrong just happened.");
                res.send({
                    Message: 'Oops, something wrong just happened.'
                });
            }
            else {
                // Return succes answer
                log("PUT", "/physicians/:PhysicianId", "Records were updated successfully...");
                res.send({
                    Message: 'Records were updated successfully...'
                });
            }
        });
    });


    /* Delete Physician by Id */
    app.delete('/physicians/:PhysicianId', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "physicians";
        var id = req.params.PhysicianId;

        if (id == null || id == undefined) {
            log("DELETE", "/physicians/:PhysicianId", "Id empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        var db = req.db;

        log("DELETE", "/physicians/:PhysicianId", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        log("DELETE", "/physicians/:PhysicianId", "Collection to be removed by Id [" + id + "]");

        //Remove all documents:
        collection.remove({ "_id": id });

        // Return succes answer
        log("DELETE", "/physicians/:PhysicianId", "Record with Id [" + id + "] was deleted successfully...");
        res.send({
            Message: 'Record with Id [' + id + '] was deleted successfully...'
        });
    });

    /* GET Physician Prescriptions by Id */
    app.get('/physicians/:PhysicianId/prescriptions', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "prescriptions";
        var id = req.params.PhysicianId;

        if (id == null || id == undefined) {
            log("GET", "/physicians/:PhysicianId/prescriptions", "Id empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        var db = req.db;

        log("GET", "/physicians/:PhysicianId/prescriptions", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        collection.find({ "PhysicianId": id }, {}, function (e, docs) {

            log("GET", "/physicians/:PhysicianId/prescriptions", "Found: [" + JSON.stringify(docs) + "]");
            res.send(docs);

        });
    });

    /* GET Physician Calendar by Id */
    app.get('/physicians/:PhysicianId/calendar', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "calendar";
        var id = req.params.PhysicianId;

        if (id == null || id == undefined) {
            log("GET", "/physicians/:PhysicianId/calendar", "Id empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        var db = req.db;

        log("GET", "/physicians/:PhysicianId/calendar", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        collection.find({ "PhysicianId": id }, {}, function (e, docs) {

            log("GET", "/physicians/:PhysicianId/calendar", "Found: [" + JSON.stringify(docs) + "]");
            res.send({ Calendar: docs });

        });
    });

    /* POST to Add Physician Calendar Entries */
    app.post('/physicians/:PhysicianId/calendar', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "calendar";
        // Set our internal DB variable
        var db = req.db;

        var id = req.params.PhysicianId;

        if (id == null || id == undefined) {
            log("POST", "/physicians/:PhysicianId/calendar", "Id empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }


        var calendar = req.body.Calendar;

        if (calendar == null || calendar == undefined) {
            log("POST", "/physicians/:PhysicianId/calendar", "Physician payload detected but no physician calendar on it... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        /**
         * Ovrriding PhysicianId in each Calendar entry with default Physician Id given as part of the URI.
         * This way, whether they were given or not, we default to the Physician Id given as part of the URI.
         */

        var calendarEntries = calendar.length;
        for (var i = 0; i < calendarEntries; i++) {
            calendar[i].PhysicianId = id;
        }


        log("POST", "/physicians/:PhysicianId/calendar", "Physician calendar entry to be inserted is [" + JSON.stringify(calendar) + "]");

        // Set collection
        log("POST", "/physicians/:PhysicianId/calendar", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        // Insert row to MongoDB
        collection.insert(calendar, function (err, doc) {
            if (err) {
                log("POST", "/physicians/:PhysicianId/calendar", "Oops, something wrong just happened.");
                res.send({
                    Message: 'Oops, something wrong just happened.'
                });
            }
            else {
                // Return succes answer
                log("POST", "/physicians/:PhysicianId/calendar", "Records were added successfully...");
                res.send({
                    Calendar: doc
                });
            }
        });
    });

    /* PUT to Add Physician Calendar Entries */
    app.put('/physicians/:PhysicianId/calendar/:entryId', function (req, res) {

        var appKey = req.get("X-App-Key");
        var appKey = appKey != null && appKey != undefined ? appKey : "";
        console.log("X-App-Key used is [" + appKey + "]");

        var DB_COLLECTION_NAME = "" + appKey + "calendar";
        // Set our internal DB variable
        var db = req.db;

        var physicianId = req.params.PhysicianId;
        var entryId = req.params.entryId;
        var calendar = req.body.Entry;

        if (physicianId == null || physicianId == undefined) {
            log("PUT", "/physicians/:PhysicianId/calendar", "PhysicianId empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }
        if (entryId == null || entryId == undefined) {
            log("PUT", "/physicians/:PhysicianId/calendar", "Calendar entryId empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }
        if (calendar == null || calendar == undefined) {
            log("PUT", "/physicians/:PhysicianId/calendar", "Physician payload detected but no physician calendar on it... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }

        /**
         * Ovrriding PhysicianId in Calendar entry with default Physician Id given as part of the URI.
         * This way, whether they were given or not, we default to the Physician Id given as part of the URI.
         */

        calendar.PhysicianId = physicianId;


        log("PUT", "/physicians/:PhysicianId/calendar", "Physician calendar entry to be inserted is [" + JSON.stringify(calendar) + "]");

        // Set collection
        log("PUT", "/physicians/:PhysicianId/calendar", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        // Insert row to MongoDB
        collection.update({ "_id": entryId }, calendar, function (err, doc) {
            if (err) {
                log("PUT", "/physicians/:PhysicianId/calendar", "Oops, something wrong just happened.");
                res.send({
                    Message: 'Oops, something wrong just happened.'
                });
            }
            else {
                // Return succes answer
                log("PUT", "/physicians/:PhysicianId/calendar", "Records were added successfully...");
                res.send({
                    Message: 'Records were added successfully...'
                });
            }
        });
    });




    /** Note: This following APIs are hidden to documentation.
     *  It is only to be used by Administrators with responsibility.
     **/

    /* Get All Collections by Name */
    app.get('/collection/:cname', function (req, res) {

        var collectionName = req.params.cname;

        if (collectionName == null || collectionName == undefined) {
            log("GET", "/collection/:cname", "collection name empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }


        var DB_COLLECTION_NAME = collectionName;
        var db = req.db;

        log("GET", "/collection/:cname", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);

        collection.find({}, {}, function (e, docs) {

            log("GET", "/collection/:cname", "Found:" + JSON.stringify({ docs }));
            res.send({ docs });

        });
    });
    /* Delete All Collections by Name*/
    app.delete('/collection/:cname', function (req, res) {

        var collectionName = req.params.cname;

        if (collectionName == null || collectionName == undefined) {
            log("DELETE", "/collection/:cname", "collection name empty or invalid... Nothing to do...");
            res.status(400).end();//Bad request...
            return;
        }


        var DB_COLLECTION_NAME = collectionName;

        var db = req.db;
        log("DELETE", "/collection/:cname", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
        var collection = db.get(DB_COLLECTION_NAME);



        //Remove all documents:
        collection.remove();

        // Return succes answer
        log("DELETE", "/collection/:cname", "All [" + DB_COLLECTION_NAME + "] Records were  deleted successfully...");
        res.send({
            Message: 'Records were  deleted successfully...'
        });
    });


};
